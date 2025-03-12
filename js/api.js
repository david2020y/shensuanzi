这是 `js/api.js` 的完整代码：

```javascript
/**
 * API调用处理
 * 由于我们不能在前端直接调用DeepSeek API（API密钥会暴露）
 * 因此这里我们创建一个模拟的API调用，用于演示目的
 */

const ApiService = {
    /**
     * 模拟API调用，生成八字分析结果
     * 实际项目中，应该通过后端服务安全地调用DeepSeek API
     * @param {Object} baziData - 八字数据
     * @param {Object} userData - 用户数据
     * @returns {Promise} - 返回分析结果
     */
    async analyzeBazi(baziData, userData) {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 模拟API响应
        return this.generateMockAnalysis(baziData, userData);
    },
    
    /**
     * 生成模拟的分析结果
     * 实际项目中，这部分应该通过DeepSeek API返回
     */
    generateMockAnalysis(baziData, userData) {
        const { yearPillar, monthPillar, dayPillar, hourPillar, wuXingCount } = baziData;
        const { name, gender } = userData;
        
        // 确定用户的主要五行特征
        const dominantElement = this.getDominantElement(wuXingCount);
        const weakElement = this.getWeakElement(wuXingCount);
        
        // 生成分析结果
        return {
            generalAnalysis: this.generateGeneralAnalysis(dominantElement, userData),
            personality: this.generatePersonalityAnalysis(dominantElement, weakElement, gender),
            career: this.generateCareerAnalysis(dominantElement, yearPillar, dayPillar),
            love: this.generateLoveAnalysis(dominantElement, gender, dayPillar),
            health: this.generateHealthAnalysis(weakElement, wuXingCount),
            wealth: this.generateWealthAnalysis(dominantElement, yearPillar, monthPillar)
        };
    },
    
    /**
     * 获取最强的五行
     */
    getDominantElement(wuXingCount) {
        let max = 0;
        let dominant = "木";
        
        for (const element in wuXingCount) {
            if (wuXingCount[element] > max) {
                max = wuXingCount[element];
                dominant = element;
            }
        }
        
        return dominant;
    },
    
    /**
     * 获取最弱的五行
     */
    getWeakElement(wuXingCount) {
        let min = Infinity;
        let weak = "木";
        
        for (const element in wuXingCount) {
            if (wuXingCount[element] < min) {
                min = wuXingCount[element];
                weak = element;
            }
        }
        
        return weak;
    },
    
    /**
     * 生成总体分析
     */
    generateGeneralAnalysis(dominantElement, userData) {
        const { name, gender } = userData;
        const genderText = gender === 'male' ? '先生' : '女士';
        
        // 根据主要五行生成不同的分析
        const elementAnalysis = {
            "木": `${name}${genderText}的八字中木行旺盛，显示出成长、进取和创新的特质。如同树木向上生长，您具有积极向上的生命力和扩张性，善于规划未来并付诸行动。木主仁，您天生具有同情心和正义感，对事物有自己独到的见解。`,
            "火": `${name}${genderText}的八字中火行旺盛，彰显出热情、活力和表现力强的特质。如同火焰照亮周围，您具有感染力和领导魅力，能够激励他人并带来温暖。火主礼，您注重人际关系和形象展现，社交能力出众。`,
            "土": `${name}${genderText}的八字中土行旺盛，体现出稳重、踏实和包容的特质。如同大地承载万物，您具有责任感和亲和力，为人诚实可靠。土主信，您重视诚信与承诺，做事有条理，善于调和各方关系。`,
            "金": `${name}${genderText}的八字中金行旺盛，展现出坚毅、果断和规范的特质。如同金属的质地坚硬有序，您做事有原则，追求完美和高效。金主义，您注重公平公正，有较强的判断力和决策能力。`,
            "水": `${name}${genderText}的八字中水行旺盛，呈现出灵活、聪慧和深邃的特质。如同水的流动与适应性，您思维活跃，善于沟通和理解复杂问题。水主智，您具有洞察力和适应能力，能够在不同环境中找到生存之道。`
        };
        
        const baseAnalysis = elementAnalysis[dominantElement] || "";
        
        return `${baseAnalysis}

通过对您八字的综合分析，可以看出您人生的总体发展趋势较为${dominantElement === '木' || dominantElement === '火' ? '积极向上' : '稳健踏实'}。您的命盘结构显示出在不同人生阶段将有不同的发展重点，需要注意的是八字中各元素的平衡对您的整体运势至关重要。

这份分析仅展示基础内容，若需了解更深入的命理解读和人生规划建议，建议选择我们的深度服务，由专业命理师为您提供更为全面的分析。`;
    },
    
    /**
     * 生成性格特质分析
     */
    generatePersonalityAnalysis(dominantElement, weakElement, gender) {
        // 根据主要五行和性别生成性格特质
        const personalityTraits = {
            "木": {
                "male": "您性格开朗积极，具有领导才能和创新精神。为人正直，有理想抱负，追求事业有成。但有时可能显得较为固执，不愿意轻易改变自己的想法。",
                "female": "您性格温和亲切，富有同情心和包容力。具有创新思维和组织能力，做事有条理。但有时可能过于理想化，对自己和他人的要求较高。"
            },
            "火": {
                "male": "您性格热情开放，富有魅力和感染力。善于表达和社交，能够轻松赢得他人的信任和支持。但有时情绪波动较大，需要学习控制自己的冲动。",
                "female": "您性格活泼热情，充满活力和创造力。善于沟通和表达，人缘极佳。但有时可能过于情绪化，容易受外界影响而情绪波动。"
            },
            "土": {
                "male": "您性格稳重踏实，为人诚恳可靠。有责任感，做事认真仔细，值得信赖。但有时可能显得过于保守，缺乏冒险精神。",
                "female": "您性格温和稳重，注重家庭和人际关系。做事有条理，善于照顾他人。但有时可能过于顾虑他人感受，忽略了自己的需求。"
            },
            "金": {
                "male": "您性格果断坚毅，做事有原则和标准。追求卓越，有较强的自律能力和执行力。但有时可能显得过于强硬，缺乏变通。",
                "female": "您性格干练利落，做事效率高，追求完美。有较强的判断力和决策能力。但有时可能过于追求完美，给自己带来不必要的压力。"
            },
            "水": {
                "male": "您性格灵活聪慧，思维敏捷，善于沟通和协调。适应能力强，能在各种环境中游刃有余。但有时可能显得优柔寡断，缺乏坚定立场。",
                "female": "您性格聪慧灵动，具有较强的感知力和洞察力。善于倾听和理解他人。但有时可能过于敏感，容易胡思乱想。"
            }
        };
        
        // 根据缺失或不足的五行，补充性格中需要注意的方面
        const weakElementAdvice = {
            "木": "建议您培养更多进取心和创新精神，不要过于固守成规，尝试拓展自己的视野和可能性。",
            "火": "建议您增强自信心和表达能力，多参与社交活动，释放内在的热情和创造力。",
            "土": "建议您培养更多的耐心和恒心，建立稳定的生活习惯和工作方法，注重脚踏实地。",
            "金": "建议您增强自律性和原则意识，学习建立更清晰的界限和标准，提高做事的条理性。",
            "水": "建议您发展更多的灵活性和应变能力，增强沟通技巧，学习如何更好地理解和适应环境变化。"
        };
        
        return `${personalityTraits[dominantElement][gender]}

您的八字中${weakElement}行相对较弱，${weakElementAdvice[weakElement]}

综合来看，您是一个${dominantElement === '木' ? '有理想有抱负' : dominantElement === '火' ? '热情开朗' : dominantElement === '土' ? '踏实可靠' : dominantElement === '金' ? '果断坚定' : '聪明灵活'}的人。在人际交往中，您${dominantElement === '火' || dominantElement === '木' ? '容易受欢迎，能够快速建立良好的人际关系' : '能够建立稳定持久的友谊，虽然交友较为谨慎'}。在面对挑战时，您${dominantElement === '金' || dominantElement === '木' ? '勇于迎难而上，不轻易放弃' : dominantElement === '水' ? '灵活应变，善于寻找解决问题的方法' : '能够沉着冷静，稳扎稳打'}。`;
    },
    
    /**
     * 生成事业分析
     */
    generateCareerAnalysis(dominantElement, yearPillar, dayPillar) {
        // 根据主要五行生成事业建议
        const careerAdvice = {
            "木": "您适合从事创新性、发展性强的行业，如创业、管理、教育、法律、环保等领域。木属性使您具有规划能力和进取心，适合担任领导角色或自主创业。",
            "火": "您适合从事与人际交往、创意表达相关的工作，如营销、公关、媒体、表演、设计等领域。火属性使您具有良好的表达能力和感染力，能够在人前展现自己的才华。",
            "土": "您适合从事需要细心、耐心和责任感的工作，如行政管理、人力资源、房地产、农业、餐饮等领域。土属性使您具有服务精神和组织能力，能够在稳定的环境中发挥才能。",
            "金": "您适合从事需要精准、规范和执行力的工作，如金融、IT、工程、质检、军警等领域。金属性使您具有分析能力和判断力，能够在有规则的环境中表现出色。",
            "水": "您适合从事需要智慧、沟通和灵活性的工作，如咨询、销售、外交、旅游、科研等领域。水属性使您具有适应能力和理解力，能够在变化的环境中灵活应对。"
        };
        
        // 根据年柱和日柱的组合，提供更具体的事业发展预测
        const careerPath = `您的命盘显示，事业发展将经历起伏但总体向上的趋势。在20-30岁阶段主要是积累经验和技能，30-40岁是事业发展的关键期，有可能获得较大突破。40岁后将进入稳定发展期，事业逐渐走向成熟。

您的八字中显示有一定的领导能力和决策才能，适合在团队中担任重要角色。但需注意的是，在职场中应避免过于${dominantElement === '木' || dominantElement === '火' ? '急躁冲动' : '保守固执'}，学会更好地平衡进取与稳健。`;
        
        return `${careerAdvice}

${careerPath}

在事业发展方面，您最大的优势是${dominantElement === '木' ? '创新思维和规划能力' : dominantElement === '火' ? '人际魅力和表达能力' : dominantElement === '土' ? '责任心和执行力' : dominantElement === '金' ? '分析能力和自律性' : '应变能力和洞察力'}。而需要克服的障碍是${dominantElement === '木' ? '缺乏耐心和稳定性' : dominantElement === '火' ? '情绪波动和注意力不集中' : dominantElement === '土' ? '创新不足和进取心欠缺' : dominantElement === '金' ? '灵活性不足和人际关系处理' : '缺乏坚持和自信'}。

建议您在职业选择上充分发挥自身优势，选择与${dominantElement}相关的行业或岗位，同时注意弥补自身不足，实现更全面的发展。`;
    },
    
    /**
     * 生成感情分析
     */
    generateLoveAnalysis(dominantElement, gender, dayPillar) {
        // 根据主要五行和性别生成感情分析
        const lovePatterns = {
            "木": {
                "male": "您在感情中注重真诚和成长，希望与伴侣共同进步。木属性使您在恋爱中主动积极，有责任感，但有时可能显得较为固执，不够体贴细腻。",
                "female": "您在感情中温柔体贴，却又不失主见。木属性使您既能照顾伴侣感受，又能保持自我独立。但有时可能过于理想化，对感情期望较高。"
            },
            "火": {
                "male": "您在感情中热情奔放，善于表达爱意。火属性使您充满魅力，容易吸引异性，但情绪波动可能较大，需要学习稳定和坚持。",
                "female": "您在感情中活泼热情，富有表现力。火属性使您善于创造浪漫和惊喜，但有时可能过于情绪化，需要学习理性和耐心。"
            },
            "土": {
                "male": "您在感情中稳重踏实，注重承诺和责任。土属性使您忠诚可靠，能为伴侣提供安全感，但有时可能缺乏浪漫和表达。",
                "female": "您在感情中温和体贴，注重家庭和稳定。土属性使您善解人意，富有包容心，但有时可能过于退让，忽略自身需求。"
            },
            "金": {
                "male": "您在感情中注重原则和品质，对伴侣有较高要求。金属性使您重视承诺，一旦认定便会坚定不移，但可能显得过于严肃和固执。",
                "female": "您在感情中理性冷静，有自己的标准和原则。金属性使您不会轻易动情，但一旦认定对方，会非常忠诚和坚定。"
            },
            "水": {
                "male": "您在感情中敏感细腻，善于理解和沟通。水属性使您富有同理心，能够感知伴侣的情绪变化，但有时可能显得优柔寡断。",
                "female": "您在感情中聪明灵动，具有较强的感知力和适应能力。水属性使您在关系中灵活变通，但有时可能缺乏安全感，需要更多的肯定和承诺。"
            }
        };
        
        // 根据日柱提供婚姻时机和伴侣类型的建议
        const marriageAdvice = `您的感情发展线索显示，在感情方面可能会经历几次重要的情感转折。比较适合您的伴侣类型是${dominantElement === '木' ? '性格沉稳、善解人意的土属性或活泼开朗的火属性人士' : dominantElement === '火' ? '可靠踏实的土属性或思维活跃的水属性人士' : dominantElement === '土' ? '有活力的火属性或有条理的金属性人士' : dominantElement === '金' ? '稳重的土属性或灵活的水属性人士' : '有创意的木属性或有原则的金属性人士'}。

在婚姻方面，您的八字显示${dominantElement === '木' || dominantElement === '火' ? '较早婚配可能会面临更多挑战，中晚婚更为有利' : '早婚和晚婚各有利弊，关键在于找到合适的伴侣'}。最重要的是，选择能与您互补、理解您特质的伴侣将带来更和谐的婚姻关系。`;
        
        return `${lovePatterns[dominantElement][gender]}

${marriageAdvice}

在感情维系方面，您需要注意的是${dominantElement === '木' ? '学会倾听和妥协，不要过于固执己见' : dominantElement === '火' ? '保持情绪稳定，增强关系的持久性' : dominantElement === '土' ? '增添关系的新鲜感和激情，避免过于平淡' : dominantElement === '金' ? '增强灵活性和包容心，不要过于苛求完美' : '建立更多安全感，避免过于敏感多疑'}。良好的沟通和互相尊重是维系您感情长久的关键。`;
    },
    
    /**
     * 生成健康分析
     */
    generateHealthAnalysis(weakElement, wuXingCount) {
        // 根据薄弱五行提供健康建议
        const healthRisks = {
            "木": "您的八字中木行偏弱，需要注意肝胆系统、筋络和眼睛的保养。建议适当增加绿色食物摄入，保持规律作息，避免过度劳累和情绪压抑。定期进行舒展筋骨的运动，如瑜伽、太极等，有助于增强身体柔韧性和活力。",
            "火": "您的八字中火行偏弱，需要注意心脑血管系统、小肠和视力的保养。建议适当增加温性食物，保持充足睡眠，避免过度劳心和情绪低落。适量进行有氧运动，如慢跑、游泳等，有助于促进血液循环和心肺功能。",
            "土": "您的八字中土行偏弱，需要注意脾胃系统、消化功能和肌肉的保养。建议规律饮食，避免过食生冷和油腻食物，注意营养均衡。适当进行中低强度的肌肉训练，如健走、轻度力量训练等，有助于增强体质和代谢功能。",
            "金": "您的八字中金行偏弱，需要注意肺部、大肠和皮肤的保养。建议保持环境清洁，避免接触过多灰尘和污染物，增强呼吸系统防护。适当进行呼吸训练和胸部扩展运动，如深呼吸、游泳等，有助于增强肺活量。",
            "水": "您的八字中水行偏弱，需要注意肾脏、泌尿系统、骨骼和听力的保养。建议保持充足水分摄入，避免过度劳累和熬夜。适当进行强化骨骼的运动，如快走、爬楼梯等，同时注意保暖，预防腰膝不适。"
        };
        
        // 根据八字五行分布，提供养生建议
        const balanceAdvice = `根据您八字中五行的分布情况，为保持身体健康的平衡，建议您：

1. 调整作息：${weakElement === '木' || weakElement === '火' ? '早睡早起，保持充足睡眠' : '避免过度劳累，注意劳逸结合'}
2. 饮食调理：增加${weakElement === '木' ? '绿色蔬菜和富含维生素的食物' : weakElement === '火' ? '适量温性食物和红色食物' : weakElement === '土' ? '富含膳食纤维和碳水化合物的食物' : weakElement === '金' ? '辛辣食物和富含蛋白质的白色食物' : '黑色食物和富含钙质的食物'}
3. 运动方式：适合您的运动包括${weakElement === '木' ? '瑜伽、太极、散步' : weakElement === '火' ? '有氧运动、舞蹈、球类运动' : weakElement === '土' ? '健走、轻度力量训练' : weakElement === '金' ? '游泳、深呼吸训练' : '八段锦、背部和腿部力量练习'}
4. 环境调适：选择${weakElement === '木' ? '绿色植物较多的环境' : weakElement === '火' ? '阳光充足的环境' : weakElement === '土' ? '稳定舒适的环境' : weakElement === '金' ? '清新干燥的环境' : '湿润安静的环境'}`;
        
        return `${healthRisks[weakElement]}

${balanceAdvice}

整体而言，您的体质属于${Object.keys(wuXingCount).reduce((a, b) => wuXingCount[a] > wuXingCount[b] ? a : b)}相对较强的类型。在季节变化时，需要特别注意${weakElement === '木' ? '春季' : weakElement === '火' ? '夏季' : weakElement === '土' ? '季节交替期' : weakElement === '金' ? '秋季' : '冬季'}的身体调养，这是您体质相对较弱的时期。

请记住，以上建议仅供参考，如有具体健康问题，请咨询专业医生。养生保健应结合个人实际情况，坚持长期调理，才能取得良好效果。`;
    },
    
    /**
     * 生成财富分析
     */
    generateWealthAnalysis(dominantElement, yearPillar, monthPillar) {
        // 根据主要五行提供财富建议
        const wealthPatterns = {
            "木": "您的财富属性偏向稳定成长型，如同树木逐渐生长。木旺的人适合通过长期投资和规划来积累财富，而非短期投机。您可能在创业、教育、文化、法律等行业获得较好的财运。",
            "火": "您的财富属性偏向波动式增长型，如同火焰时旺时衰。火旺的人财运起伏较大，善于抓住机会快速获利，但也需防止财富如火般迅速消散。您可能在营销、媒体、娱乐、餐饮等行业获得较好的财运。",
            "土": "您的财富属性偏向稳健积累型，如同土地逐渐丰厚。土旺的人财运踏实，适合通过稳定工作和保守投资来积累财富。您可能在房地产、农业、零售、服务业等行业获得较好的财运。",
            "金": "您的财富属性偏向精准收益型，如同金属的精确价值。金旺的人财运明确，善于精打细算和规范理财，适合结构化的投资方式。您可能在金融、科技、工程、机械等行业获得较好的财运。",
            "水": "您的财富属性偏向流动变化型，如同水的流动与渗透。水旺的人财运灵活，善于发现机会并灵活调整投资策略。您可能在贸易、物流、旅游、信息传播等行业获得较好的财运。"
        };
        
        // 根据年柱和月柱的组合，提供更具体的财运预测
        const wealthTiming = `您的财富发展时机：在人生早期(20-30岁)，主要是知识和能力的积累期，财富增长较为缓慢。30-45岁是您财富积累的重要阶段，有望通过${dominantElement === '木' || dominantElement === '火' ? '创业或投资' : '稳定工作和合理理财'}取得较大突破。45岁后将进入财富稳定期，收入来源更加多元化。

您理财方面的优势是${dominantElement === '木' ? '规划能力和前瞻性' : dominantElement === '火' ? '把握机会和决断力' : dominantElement === '土' ? '稳健和持久性' : dominantElement === '金' ? '精确分析和风险控制' : '灵活应变和信息敏感度'}，而需要注意的弱点是${dominantElement === '木' ? '有时过于理想化，低估风险' : dominantElement === '火' ? '可能过于冲动，缺乏耐心' : dominantElement === '土' ? '可能过于保守，错失机会' : dominantElement === '金' ? '可能过于固执，缺乏创新' : '可能决策不够坚定，方向不够明确'}。`;
        
        // 提供投资建议
        const investmentAdvice = `适合您的投资方式：

1. ${dominantElement === '木' ? '长期价值投资，如优质股票、成长型基金' : dominantElement === '火' ? '灵活配置，兼顾成长与价值' : dominantElement === '土' ? '稳健型投资，如债券、定期理财产品' : dominantElement === '金' ? '结构化产品，精细化资产配置' : '多元化投资组合，灵活调整策略'}
2. ${dominantElement === '木' || dominantElement === '火' ? '可适当配置一定比例的高风险高回报产品' : '以稳健安全的投资为主，辅以少量增长型资产'}
3. 财务规划上建议${dominantElement === '木' || dominantElement === '水' ? '制定详细的长期财务目标，定期检视和调整' : dominantElement === '火' ? '控制消费冲动，增加储蓄比例' : dominantElement === '土' || dominantElement === '金' ? '适当增加投资比例，不要过于保守'}`;
        
        return `${wealthPatterns[dominantElement]}

${wealthTiming}

${investmentAdvice}

总体而言，您在财富方面的发展前景良好，通过合理规划和适当把握机会，有望实现财务自由。建议您在理财过程中充分发挥自身优势，同时注意弥补不足，保持财富与生活的平衡。`;
    }
};/**
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