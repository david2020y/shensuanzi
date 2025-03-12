const axios = require('axios');

exports.handler = async function(event, context) {
  // 只允许POST请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // 获取八字信息
    const baziData = data.baziData;
    const yearPillar = baziData.yearPillar;
    const monthPillar = baziData.monthPillar;
    const dayPillar = baziData.dayPillar;
    const hourPillar = baziData.hourPillar;
    
    // 构建八字信息文本
    const baziInfo = `
    八字信息：
    年柱：${yearPillar.tianGan}${yearPillar.diZhi} (${yearPillar.wuXing})
    月柱：${monthPillar.tianGan}${monthPillar.diZhi} (${monthPillar.wuXing})
    日柱：${dayPillar.tianGan}${dayPillar.diZhi} (${dayPillar.wuXing})
    时柱：${hourPillar.tianGan}${hourPillar.diZhi} (${hourPillar.wuXing})
    `;
    
    // 五行统计
    const wuxingCount = baziData.wuXingCount;
    const wuxingInfo = `
    五行统计：
    金：${wuxingCount.金} 木：${wuxingCount.木} 水：${wuxingCount.水} 火：${wuxingCount.火} 土：${wuxingCount.土}
    `;
    
    // 调用DeepSeek API
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一位专业的易学命理大师，专注于八字分析。你需要根据用户提供的八字信息进行详细解读。分析应包含以下几个方面：总体分析、性格特质、事业财运、感情姻缘、健康状况、财富运势。每个部分分别进行详细阐述，内容丰富且有针对性。使用专业但通俗易懂的语言，避免过于玄学的表述，保持分析的实用性和可操作性。"
          },
          {
            role: "user",
            content: `请根据以下信息进行八字分析：
            姓名：${data.userData.name}
            性别：${data.userData.gender === 'male' ? '男' : '女'}
            出生日期：${data.userData.birthYear}年${data.userData.birthMonth}月${data.userData.birthDay}日
            出生时辰：${data.userData.birthHour}
            历法：${data.userData.isLunar ? '农历' : '公历'}
            出生地点：${data.userData.birthPlace}
            
            ${baziInfo}
            ${wuxingInfo}
            
            请提供以下几个方面的分析，每个部分分别用对应标题开头：
            1. 总体分析：整体八字格局和人生走向
            2. 性格特质：基于八字的性格分析和优缺点
            3. 事业财运：适合的行业、事业发展规律和机遇
            4. 感情姻缘：感情特点、婚姻状况和适合的伴侣类型
            5. 健康状况：可能的健康优势和需要注意的方面
            6. 财富运势：财运特点、积累财富的方式和理财建议
            
            请确保每个部分都有详细且有针对性的内容。`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        analysis: response.data.choices[0].message.content
      })
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Error processing your request",
        details: error.message
      })
    };
  }
};