/**
 * 八字计算工具
 * 简化版，仅用于演示
 */

const BaziCalculator = {
    // 天干
    tianGan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    
    // 地支
    diZhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    
    // 五行
    wuXing: ["木", "火", "土", "金", "水"],
    
    // 天干对应的五行
    tianGanWuXing: {
        "甲": "木", "乙": "木",
        "丙": "火", "丁": "火",
        "戊": "土", "己": "土",
        "庚": "金", "辛": "金",
        "壬": "水", "癸": "水"
    },
    
    // 地支对应的五行
    diZhiWuXing: {
        "子": "水", "丑": "土",
        "寅": "木", "卯": "木",
        "辰": "土", "巳": "火",
        "午": "火", "未": "土",
        "申": "金", "酉": "金",
        "戌": "土", "亥": "水"
    },
    
    // 计算年柱
    getYearPillar(year) {
        // 简化计算，实际上需要考虑立春
        const tianGanIndex = (year - 4) % 10;
        const diZhiIndex = (year - 4) % 12;
        
        return {
            tianGan: this.tianGan[tianGanIndex],
            diZhi: this.diZhi[diZhiIndex],
            wuXing: this.tianGanWuXing[this.tianGan[tianGanIndex]]
        };
    },
    
    // 计算月柱
    getMonthPillar(year, month) {
        // 简化计算，实际需要考虑节气
        // 以立春为正月起点，此处做简化处理
        const base = (year - 4) % 10;
        const tianGanIndex = (base * 2 + month - 1) % 10;
        const diZhiIndex = (month + 1) % 12;
        
        return {
            tianGan: this.tianGan[tianGanIndex],
            diZhi: this.diZhi[diZhiIndex],
            wuXing: this.tianGanWuXing[this.tianGan[tianGanIndex]]
        };
    },
    
    // 计算日柱
    getDayPillar(year, month, day) {
        // 简化计算，实际需要考虑时间精确到秒
        // 使用算法计算，此处做非常简化的处理
        // 这里使用1900年1月31日作为甲午日的基准
        const baseDate = new Date(1900, 0, 31);
        const currentDate = new Date(year, month - 1, day);
        
        // 计算相差的天数
        const timeDiff = currentDate.getTime() - baseDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        const tianGanIndex = (daysDiff % 10 + 10) % 10;
        const diZhiIndex = (daysDiff % 12 + 12) % 12;
        
        return {
            tianGan: this.tianGan[tianGanIndex],
            diZhi: this.diZhi[diZhiIndex],
            wuXing: this.tianGanWuXing[this.tianGan[tianGanIndex]]
        };
    },
    
    // 计算时柱
    getHourPillar(dayTianGan, hour) {
        // 子时为0点到1点，分12个时辰
        const baseIndex = this.tianGan.indexOf(dayTianGan);
        const tianGanIndex = (baseIndex * 2 + Math.floor(hour / 2)) % 10;
        const diZhiIndex = hour % 12;
        
        return {
            tianGan: this.tianGan[tianGanIndex],
            diZhi: this.diZhi[diZhiIndex],
            wuXing: this.tianGanWuXing[this.tianGan[tianGanIndex]]
        };
    },
    
    // 计算八字
    calculateBazi(year, month, day, hour, isLunar = false) {
        // 处理农历转公历，简化起见，不做实际转换
        // 实际应用中需要使用专业的历法转换库
        
        // 如果是农历，这里应该有转换，但简化起见，直接用输入值
        
        const yearPillar = this.getYearPillar(year);
        const monthPillar = this.getMonthPillar(year, month);
        const dayPillar = this.getDayPillar(year, month, day);
        const hourPillar = this.getHourPillar(dayPillar.tianGan, hour);
        
        // 计算五行数量
        const wuXingCount = this.countWuXing(yearPillar, monthPillar, dayPillar, hourPillar);
        
        return {
            yearPillar,
            monthPillar,
            dayPillar,
            hourPillar,
            wuXingCount
        };
    },
    
    // 统计五行数量
    countWuXing(yearPillar, monthPillar, dayPillar, hourPillar) {
        const count = {
            "木": 0,
            "火": 0,
            "土": 0,
            "金": 0,
            "水": 0
        };
        
        // 天干五行
        count[this.tianGanWuXing[yearPillar.tianGan]]++;
        count[this.tianGanWuXing[monthPillar.tianGan]]++;
        count[this.tianGanWuXing[dayPillar.tianGan]]++;
        count[this.tianGanWuXing[hourPillar.tianGan]]++;
        
        // 地支五行
        count[this.diZhiWuXing[yearPillar.diZhi]]++;
        count[this.diZhiWuXing[monthPillar.diZhi]]++;
        count[this.diZhiWuXing[dayPillar.diZhi]]++;
        count[this.diZhiWuXing[hourPillar.diZhi]]++;
        
        return count;
    },
    
    // 生成随机八字（仅用于演示）
    generateRandomBazi() {
        const year = Math.floor(Math.random() * 50) + 1970;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1; // 简化，避免月底日期问题
        const hour = Math.floor(Math.random() * 12);
        
        return this.calculateBazi(year, month, day, hour);
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaziCalculator;
}