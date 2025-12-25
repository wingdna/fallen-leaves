
// @ARCHITECT_LOCK: CORE DATA STRUCTURES
// -------------------------------------------------------------------------
// ⛔️ ARCHITECTURAL RESTRICTION ⛔️
// This file defines the immutable data contract of the application.
// -------------------------------------------------------------------------

export enum Suit {
  CASH = '十',   // Shi (Cash/Tens)
  STRINGS = '貫', // Guan (Strings)
  COINS = '索',   // Suo (Coins)
  TEXTS = '文'    // Wen (Texts/Literati)
}

export enum CardColor {
  RED = 'red',     // Zun/Shang (High/Reward)
  GREEN = 'green', // Qu/Ji (Interest/Extreme)
  BLACK = 'black'  // Qing (Blue/Black)
}

export enum CardRank {
  ZUN = 'ZUN',   // Reward (Red)
  JIAN = 'JIAN', // Shoulder (Red)
  BAI = 'BAI',   // Hundred (Red - Special)
  JI = 'JI',     // Extreme (Green)
  QING = 'QING'  // Qing (Black/Normal)
}

export type SuitStatus = 'SAFE' | 'FORBIDDEN' | 'NEUTRAL' | 'RECOMMENDED';

export type LeadingEffectType = 'GOLD' | 'JADE' | 'BRONZE' | null;

export interface Card {
  id: string;
  suit: Suit;
  name: string; // Chinese name e.g., "萬萬"
  value: number; // Numeric value for logic
  color: CardColor;
  rank: CardRank;
  description?: string; // Character name like "宋江"
  isSpecial?: boolean; // For visual flair
  isPot?: boolean; // NEW: Marks cards originating from the Pot or Mian Zhang
  originalRank?: CardRank; // For Mian Zhang substitution tracking
  substituteRank?: CardRank; // For Mian Zhang substitution tracking
}

export interface TrickCard {
  card: Card;
  isFaceUp: boolean;
  round: number;
  isKaiChong?: boolean; // Added for Kai Chong tracking
  meritMultiplier?: number; // Battle Merit: 1, 2, or 3
  hidden?: boolean; // NEW: Hide visually (e.g. consumed in Kai Chong duplicate)
}

export enum PlayerType {
  HUMAN = 'HUMAN',
  AI = 'AI',
  NETWORK = 'NETWORK' // New: Real remote player
}

// --- ROOM & DECORATION TYPES ---

export type ZoneId = 'TEA_ROOM' | 'BEDROOM' | 'GARDEN';

export type FurnitureType = 
    | 'TABLE' | 'CHAIR' | 'LAMP' | 'SCREEN' | 'PLANT' | 'RUG' 
    | 'GAME_TABLE' | 'BED' | 'WARDROBE' | 'DESK' 
    | 'TREE' | 'ROCK' | 'POND' | 'LANTERN_STONE';

export interface FurnitureItem {
    id: string;
    type: FurnitureType;
    zoneId: ZoneId; // NEW: Which room is this item in?
    position: [number, number, number]; // x, y, z
    rotation: number; // radians around Y axis
}

export interface RoomLayout {
    items: FurnitureItem[];
    themeId: string;
}

// --- SOCIAL & PROFILE TYPES ---

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type GazeDirection = 'LEFT' | 'RIGHT' | 'CENTER'; // NEW: Face orientation

export interface UserProfile {
    id: string; // UUID from Auth
    username: string;
    avatar_url?: string;
    gender: Gender;
    age: number;
    country: string; // ISO 2-letter code (e.g., 'cn', 'jp', 'us')
    gazeDirection?: GazeDirection; // NEW: Estimated face direction
    location?: {
        lat: number;
        lng: number;
        city?: string;
    };
    is_looking_for_match: boolean;
    last_active: number;
    friends: string[]; // List of friend UUIDs
    coins?: number; // NEW: Economy System (Copper Coins)
    room_layout?: RoomLayout; // NEW: Personal Room Data
}

export enum SocialProvider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    WECHAT = 'wechat', // Requires specific configuration in Supabase/MemFire
    DOUYIN = 'douyin'  // Usually custom implementation, we will mock/interface it
}

export enum GamePhase {
  DEALING = 'DEALING',
  SHUFFLING = 'SHUFFLING', // Added for animation
  PLAYING = 'PLAYING',
  KAI_CHONG = 'KAI_CHONG', // New Phase
  SCORING = 'SCORING',
  GAME_OVER = 'GAME_OVER',
  TUTORIAL = 'TUTORIAL' // NEW: Tutorial Phase
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface SpecialCaptureFlags {
    wanCaughtQian: boolean;
    wanCaughtBai: boolean;
    qianCaughtBai: boolean;
}

export interface AILearningState {
    playerId: number;
    gamesPlayed: number;
    winRate: number;
    
    // Dynamic Personality Parameters (0.0 to 1.0)
    aggression: number;      // Tendency to lead high cards/capture
    riskTolerance: number;   // Tendency to ignore Warnings
    bluffFrequency: number;  // Tendency to play odd cards to confuse
    
    // History
    lastRole: 'BANKER' | 'PEASANT';
    lastResult: 'WIN' | 'LOSS' | 'DRAW';
}

export interface MatchLogEntry {
    id: string;
    timestamp: number;
    bankerId: number;
    mianZhangName: string;
    results: {
        playerId: number;
        scoreChange: number;
        patterns: string[];
        isWinner: boolean;
    }[];
}

export interface GameHistory {
    totalRounds: number;
    bankerWins: number;
    peasantWins: number;
    lastRoundWinnerType: 'BANKER' | 'PEASANT' | 'DRAW';
    aggressionModifier: number; // -1 (Conservative) to 1 (Aggressive)
    aiLearningStates: Record<number, AILearningState>; // Map playerId to state
    matchLogs: MatchLogEntry[]; // New: List of recent matches
}

export interface Player {
  id: number;
  name: string;
  type: PlayerType;
  hand: Card[];
  trickPile: TrickCard[]; // Cards played by this player (Visual Pile)
  capturedCards: Card[];  // Cards won by this player (Logical Scoring Pile)
  isDealer: boolean;
  position: 'Bottom' | 'Right' | 'Top' | 'Left'; // UI positioning
  score: number; // Total Game Score (Table Points)
  coins?: number; // NEW: Visual representation of coins in current session
  isBaiLaoRevealed?: boolean; // Track if Millionaire identity is revealed
  isSuspectedBaiLao?: boolean; // NEW: Track if player is suspected Millionaire (led Cash first)
  avatarUrl?: string; // URL for player avatar
  
  // Profile info for Network players
  profile?: UserProfile; 
  
  // Round specific stats
  roundDiao?: number;
  roundScoreChange?: number;
  roundPatterns?: string[];
  
  // Dynamic Strategy (for AI)
  learningState?: AILearningState;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export type SupportedLanguage = 'en' | 'zh_CN' | 'zh_TW' | 'ja' | 'ko';

export interface PatternDetail {
    name: string;
    score: number; // Points awarded or He value
    cards: Card[]; // The specific cards that form this pattern
    category: 'KAI_ZHU' | 'QIAO_MEN' | 'SE_YANG' | 'KC_SE_YANG' | 'DUO_JIN'; // Added DUO_JIN
}

export interface DuoJinInfo {
    isDuoJin: boolean;
    victimId: number; // The player with 3 Shang who was snatched
    scoreBase: number; // 3, 5, or 10
    type: 'NORMAL' | 'CASH' | 'NU_JIANG';
}

export interface KaiChongDetail {
    playerId: number;
    matchedCard: Card; // The pot card
    sourceCards: Card[]; // The table cards used to match
    score: number;     // Total Zhu points
    individualScores?: number[]; // Breakdown of scores per source card
    matchType: 'TONG' | 'BROTHER' | 'SHUANG_LIN' | 'SHUN_LING' | 'DAN_CHONG' | 'JIAN_LING' | 'OTHER' | 'TE_DENG';
    priorityScore: number; // Internal for sorting (Twin > Double > Single > Gap)
    description: string; // Formatted string
    duoJin?: DuoJinInfo; // NEW: Duo Jin Biao context
}

export interface ScoreNotification {
    id: string; // Unique timestamp ID to force re-render
    playerId: number;
    text: string;
    score: number;
    type: 'PATTERN' | 'KAI_CHONG' | 'CRITICAL';
}

export interface ScoreResult {
    playerId: number;
    trickCount: number; 
    diaoRawValue: number;
    
    // Raw Points (Before Base Multiplier)
    diaoPointChange: number;      
    kaiZhuPointChange: number;    
    qiaoMenPointChange: number;   
    seYangPointChange: number;    
    kaiChongPointChange: number;  

    // Settled Points (After Base Multiplier & Banker/Peasant Net)
    diaoSettled?: number;
    kaiZhuSettled?: number;
    qiaoMenSettled?: number;
    seYangSettled?: number;
    kaiChongSettled?: number;

    totalRoundChange: number;     
    patterns: string[];           
    patternDetails: PatternDetail[]; 
    kaiChongDetails: KaiChongDetail[]; 
    cardsWonCount: number;
    visibleTrickCards: Card[]; 
    scoringCards: Card[];      
    allCapturedCards?: Card[]; 
    
    // PENALTY FIELDS
    penaltyPayerId?: number;      
    penaltyReason?: string;       
    penaltyAdjustment?: number; 
    
    violations: ViolationRecord[]; 
    
    // ECONOMY FIELDS
    coinChange?: number; // The actual money won/lost based on totalRoundChange * Rate
}

// --- TUTORIAL TYPES ---

export interface TutorialStep {
    id: string;
    message: string;
    // If defined, user MUST play this card.
    forcedCardId?: string; 
    // If true, user must click "Next" to proceed (for reading steps).
    waitForClick?: boolean;
    // IDs of cards to highlight
    highlightCardIds?: string[];
    // Auto-play AI moves after this step
    aiMoves?: { playerId: number, cardId: string }[];
    // Dynamically switch cards in players' hands for "Show & Tell" phases
    setPlayerHand?: string[]; 
    setAiHands?: { [key: number]: string[] };
    // NEW: Clear captured cards and trick pile for reset
    clearCapturedCards?: boolean;
}

export interface TutorialScenario {
    id: string;
    title: string;
    description: string;
    playerHandIds: string[];
    aiHandIds: { 1: string[], 2: string[], 3: string[] };
    bankerId: number;
    // Optional: Specify who plays first in this scenario. Defaults to Banker.
    startingPlayerId?: number; 
    // Allow presetting game state (e.g., opened suits for Forbidden logic)
    preconfiguredState?: {
        openedSuits?: { suit: Suit, leaderId: number, isBanker: boolean }[];
    };
    // NEW: Allow presetting captured cards for visual demonstration, assigned to specific players
    initialCapturedCards?: { playerId: number, cardIds: string[] }[];
    steps: TutorialStep[];
}

// --- RISK & PENALTY ENGINE TYPES ---

export enum RiskLevel {
    SAFE = 'SAFE',
    NOTICE = 'NOTICE',       
    WARNING = 'WARNING',     
    PENALTY = 'PENALTY'      
}

export enum TacticalPriority {
    ANTI_BANKER = 'ANTI_BANKER',     
    ANTI_BAI_LAO = 'ANTI_BAI_LAO',   
    ANTI_SE_YANG = 'ANTI_SE_YANG'    
}

export interface ViolationRecord {
    playerId: number;
    round: number;
    card: Card;
    ruleId: string;
    riskLevel: RiskLevel;
    tacticalContext: TacticalPriority;
}

export interface RiskAssessment {
    riskLevel: RiskLevel;
    ruleId: string;
    message: string; 
    tacticalContext: TacticalPriority;
}
