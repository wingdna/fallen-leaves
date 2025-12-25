
import { SupportedLanguage, Suit, CardColor, CardRank, Card } from './types';

export const ID_20_WAN = 'c_1';
export const ID_BAI_WAN = 'c_9';
export const ID_QIAN_WAN = 'c_10';
export const ID_WAN_WAN = 'c_11';
export const ID_1_GUAN = 's_1';
export const ID_5_GUAN = 's_5';
export const ID_6_GUAN = 's_6';
export const ID_8_GUAN = 's_8';
export const ID_1_SUO = 'k_1';
export const ID_9_WEN = 't_1';
export const ID_9_GUAN = 's_9';
export const ID_9_SUO = 'k_9';
export const ID_KONG_WEN = 't_11';
export const ID_BAN_WEN = 't_10';
export const ID_1_WEN = 't_9';
export const ID_90_WAN = 'c_8';

export const generateDeck = (): Card[] => {
    const deck: Card[] = [];
    const cashNames = ["二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十", "百萬", "千萬", "萬萬"];
    for (let i = 1; i <= 11; i++) {
        let rank = CardRank.QING; let color = CardColor.BLACK;
        if (i === 11 || i === 10) { rank = CardRank.ZUN; color = CardColor.RED; }
        else if (i === 9) { rank = CardRank.BAI; color = CardColor.RED; }
        else if (i === 1) { rank = CardRank.JI; color = CardColor.GREEN; }
        deck.push({ id: `c_${i}`, suit: Suit.CASH, name: cashNames[i-1], value: i, color, rank });
    }
    const guanNames = ["一貫", "二貫", "三貫", "四貫", "五貫", "六貫", "七貫", "八貫", "九貫"];
    for (let i = 1; i <= 9; i++) {
        let rank = CardRank.QING; let color = CardColor.BLACK;
        if (i === 9) { rank = CardRank.ZUN; color = CardColor.RED; }
        else if (i === 8) { rank = CardRank.JIAN; color = CardColor.RED; }
        else if (i === 1) { rank = CardRank.JI; color = CardColor.GREEN; }
        deck.push({ id: `s_${i}`, suit: Suit.STRINGS, name: guanNames[i-1], value: i, color, rank });
    }
    const suoNames = ["一索", "二索", "三索", "四索", "五索", "六索", "七索", "八索", "九索"];
    for (let i = 1; i <= 9; i++) {
        let rank = CardRank.QING; let color = CardColor.BLACK;
        if (i === 9) { rank = CardRank.ZUN; color = CardColor.RED; }
        else if (i === 8) { rank = CardRank.JIAN; color = CardColor.RED; }
        else if (i === 1) { rank = CardRank.JI; color = CardColor.GREEN; }
        deck.push({ id: `k_${i}`, suit: Suit.COINS, name: suoNames[i-1], value: i, color, rank });
    }
    const wenNames = ["九文", "八文", "七文", "六文", "五文", "四文", "三文", "二文", "一文", "半文", "空文"];
    for (let i = 1; i <= 11; i++) {
        let rank = CardRank.QING; let color = CardColor.BLACK;
        if (i === 11) { rank = CardRank.ZUN; color = CardColor.RED; }
        else if (i === 10) { rank = CardRank.JIAN; color = CardColor.RED; }
        else if (i === 1) { rank = CardRank.JI; color = CardColor.GREEN; }
        deck.push({ id: `t_${i}`, suit: Suit.TEXTS, name: wenNames[i-1], value: i, color, rank });
    }
    return deck;
};

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    score_penalty: 'Penalty Adj.', penalty_pay: 'Penalty (Paid)', penalty_receive: 'Penalty (Recv)',
    home: 'Home', nextRound: 'Next Round', score_settlement: 'Round Results',
    visibleCards: 'Captured', tab_se_yang: 'Patterns', tab_kai_chong: 'Breakouts',
    kc_single: 'Single', kc_brother: 'Brothers', kc_double: 'Twins', kc_seq: 'Sequence', kc_gap: 'Gap',
    enterGame: 'Enter World', continueGame: 'Resume Battle', netBattle: 'Fated Gathering',
    signOut: 'Leave', aiDisabled: 'Master is meditating.', masterTitle: 'Wisdom',
    masterName: 'MA DIAO MASTER', meditating: 'Master is thinking...',
    risk_penalty: 'VIOLATION', risk_warning: 'WARNING'
  },
  zh_CN: {
    score_penalty: '违例赔付', penalty_pay: '包赔 (支出)', penalty_receive: '获赔 (收入)',
    home: '首页', nextRound: '下局', score_settlement: '本局结算',
    visibleCards: '得桌牌', tab_se_yang: '色样', tab_kai_chong: '开冲',
    kc_single: '单冲', kc_brother: '兄弟冲', kc_double: '双胞胎', kc_seq: '顺领冲', kc_gap: '间领冲',
    enterGame: '进入江湖', continueGame: '继续博弈', netBattle: '因缘小聚',
    signOut: '洗手离场', aiDisabled: '大师闭关中', masterTitle: '博弈指导',
    masterName: '马吊大师', meditating: '大师推演中...',
    risk_penalty: '违例包赔', risk_warning: '兵家大忌'
  },
  zh_TW: {
    score_penalty: '違例賠付', penalty_pay: '包賠 (支出)', penalty_receive: '獲賠 (收入)',
    home: '首頁', nextRound: '下局', score_settlement: '本局結算',
    visibleCards: '得桌牌', tab_se_yang: '色樣', tab_kai_chong: '開衝',
    kc_single: '單衝', kc_brother: '兄弟衝', kc_double: '雙胞胎', kc_seq: '順領衝', kc_gap: '間領衝',
    enterGame: '進入江湖', continueGame: '繼續博弈', netBattle: '因緣小聚',
    signOut: '洗手離場', aiDisabled: '大師閉關中', masterTitle: '博弈指導',
    masterName: '馬弔大師', meditating: '大師推演中...',
    risk_penalty: '違例包賠', risk_warning: '兵家大忌'
  },
  ja: {
    score_penalty: 'ペナルティ', enterGame: '対局開始', continueGame: '再開', netBattle: '因縁の集い',
    signOut: '離席', masterName: '馬吊の師', meditating: '推論中...'
  },
  ko: {
    score_penalty: '벌칙', enterGame: '대국 시작', continueGame: '계속하기', netBattle: '인연의 소모임',
    signOut: '퇴장', masterName: '마조 스승', meditating: '명상 중...'
  }
};
