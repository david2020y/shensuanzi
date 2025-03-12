/**
 * API调用处理
 */
const ApiService = {
    /**
     * 调用DeepSeek API分析八字
     * @param {Object} baziData - 八字数据
     * @param {Object} userData - 用户数据
     * @returns {Promise} - 返回分析结果
     */
    async analyzeBazi(baziData, userData) {
        try {
            console.log("开始调用API函数");
            // 调用Vercel函数
            const response = await fetch('/.netlify/functions/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    baziData: baziData,
                    userData: userData
                })
            });
            
            console.log("API响应状态:", response.status);
            
            if (!response.ok) {
                throw new Error('API请求失败');
            }
            
            const result = await response.json();
            console.log("API返回结果:", result);
            
            // 如果收到了分析结果，使用API结果
            if (result.analysis) {
                console.log("使用API分析结果");
                return this.parseAnalysisText(result.analysis);
            } else {
                console.log("API没有返回分析结果，使用模拟数据");
                return this.generateMockAnalysis(baziData, userData);
            }
        } catch (error) {
            console.error('分析请求出错:', error);
            console.log("出错，使用模拟数据");
            // 返回模拟数据作为后备方案
            return this.generateMockAnalysis(baziData, userData);
        }
    }
    
    /**
     * 解析API返回的文本到各个部分
     * @param {string} text - 分析文本
     * @returns {Object} - 结构化的分析结果
     */
    parseAnalysisText(text) {
        // 定义各部分的标识符
        const sections = {
            generalAnalysis: this.extractSection(text, '总体分析', ['性格特质', '事业财运', '感情姻缘', '健康状况', '财富运势']),
            personality: this.extractSection(text, '性格特质', ['事业财运', '感情姻缘', '健康状况', '财富运势']),
            career: this.extractSection(text, '事业财运', ['感情姻缘', '健康状况', '财富运势']),
            love: this.extractSection(text, '感情姻缘', ['健康状况', '财富运势']),
            health: this.extractSection(text, '健康状况', ['财富运势']),
            wealth: this.extractSection(text, '财富运势', [])
        };
        
        // 如果解析失败，使用原文本
        if (!sections.generalAnalysis && text) {
            sections.generalAnalysis = text;
        }
        
        return sections;
    },
    
    /**
     * 从文本中提取特定部分
     * @param {string} text - 完整文本
     * @param {string} section - 部分标题
     * @param {Array} nextSections - 可能的下一部分标题列表
     * @returns {string} - 提取的内容
     */
    extractSection(text, section, nextSections) {
        const sectionIndex = text.indexOf(section);
        if (sectionIndex === -1) return '';
        
        let endIndex = text.length;
        for (const nextSection of nextSections) {
            const index = text.indexOf(nextSection);
            if (index !== -1 && index < endIndex) {
                endIndex = index;
            }
        }
        
        return text.substring(sectionIndex, endIndex).trim();
    },
    
    // 保留原有的模拟分析函数作为后备方案...
    generateMockAnalysis(baziData, userData) {
        // 原有的模拟数据生成代码保持不变
    }
    
    // 其他原有的方法保持不变...
};