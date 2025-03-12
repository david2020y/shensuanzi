/**
 * 神算子 - 主要JavaScript功能
 */

// 当DOM加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化不同页面的功能
    if (document.querySelector('.welcome-page')) {
        initWelcomePage();
    } else if (document.querySelector('.form-page')) {
        initFormPage();
    } else if (document.querySelector('.result-page')) {
        initResultPage();
    }
    
    // 初始化所有页面都需要的通用功能
    initCommonFeatures();
});

/**
 * 初始化欢迎页面
 */
function initWelcomePage() {
    console.log('欢迎页面初始化');
    
    // 添加动画效果
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.classList.add('pulse');
    }
}

/**
 * 初始化表单页面
 */
function initFormPage() {
    console.log('表单页面初始化');
    
    // 初始化年月日选择器
    initDateSelectors();
    
    // 初始化表单步骤导航
    initFormSteps();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化表单提交
    initFormSubmission();
    
    // 初始化隐私政策弹窗
    initPrivacyModal();
}

/**
 * 初始化结果页面
 */
function initResultPage() {
    console.log('结果页面初始化');
    
    // 初始化分析部分的折叠/展开功能
    initAccordion();
    
    // 初始化分享功能
    initSharing();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 从URL参数获取结果数据
    loadResultData();
    
    // 处理服务选择按钮
    initServiceSelection();
}

/**
 * 初始化通用功能
 */
function initCommonFeatures() {
    // 处理所有模态窗口的打开和关闭
    initModals();
}

/**
 * 初始化年月日选择器
 */
function initDateSelectors() {
    // 获取相关元素
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');
    const calendarToggle = document.getElementById('calendarType');
    
    if (!yearSelect || !monthSelect || !daySelect) return;
    
    // 生成年份选项（1940-2020）
    const currentYear = new Date().getFullYear();
    for (let year = 1940; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }
    
    // 生成月份选项
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month + '月';
        monthSelect.appendChild(option);
    }
    
    // 更新日期选项（根据年月）
    function updateDays() {
        const year = parseInt(yearSelect.value) || new Date().getFullYear();
        const month = parseInt(monthSelect.value) || 1;
        const isLunar = calendarToggle.checked;
        
        // 清空现有选项
        daySelect.innerHTML = '<option value="">请选择</option>';
        
        // 确定每月的天数
        let daysInMonth;
        if (isLunar) {
            // 简化处理，实际应根据农历计算
            daysInMonth = 30;
        } else {
            // 公历天数计算
            daysInMonth = new Date(year, month, 0).getDate();
        }
        
        // 生成日期选项
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
    }
    
    // 绑定事件
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    calendarToggle.addEventListener('change', updateDays);
    
    // 初始化日期选项
    updateDays();
}

/**
 * 初始化表单步骤导航
 */
function initFormSteps() {
    // 获取相关元素
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const nextToStep2 = document.getElementById('nextToStep2');
    const backToStep1 = document.getElementById('backToStep1');
    const nextToStep3 = document.getElementById('nextToStep3');
    const backToStep2 = document.getElementById('backToStep2');
    
    if (!step1 || !step2 || !step3) return;
    
    // 进度条状态更新
    function updateProgressBar(currentStep) {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.remove('active');
                step.classList.add('completed');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // 步骤1到步骤2
    if (nextToStep2) {
        nextToStep2.addEventListener('click', function() {
            if (validateStep1()) {
                step1.classList.remove('active');
                step2.classList.add('active');
                updateProgressBar(2);
                window.scrollTo(0, 0);
            }
        });
    }
    
    // 步骤2返回步骤1
    if (backToStep1) {
        backToStep1.addEventListener('click', function() {
            step2.classList.remove('active');
            step1.classList.add('active');
            updateProgressBar(1);
            window.scrollTo(0, 0);
        });
    }
    
    // 步骤2到步骤3
    if (nextToStep3) {
        nextToStep3.addEventListener('click', function() {
            if (validateStep2()) {
                step2.classList.remove('active');
                step3.classList.add('active');
                updateProgressBar(3);
                window.scrollTo(0, 0);
            }
        });
    }
    
    // 步骤3返回步骤2
    if (backToStep2) {
        backToStep2.addEventListener('click', function() {
            step3.classList.remove('active');
            step2.classList.add('active');
            updateProgressBar(2);
            window.scrollTo(0, 0);
        });
    }
    
    // 初始化进度条
    updateProgressBar(1);
}

/**
 * 验证表单第一步
 */
function validateStep1() {
    const nameInput = document.getElementById('name');
    const nameError = nameInput.nextElementSibling;
    
    // 验证姓名
    if (!nameInput.value.trim()) {
        nameError.textContent = '请输入您的姓名';
        nameInput.focus();
        return false;
    } else {
        nameError.textContent = '';
    }
    
    return true;
}

/**
 * 验证表单第二步
 */
function validateStep2() {
    const yearSelect = document.getElementById('birthYear');
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');
    const yearError = yearSelect.nextElementSibling;
    const monthError = monthSelect.nextElementSibling;
    const dayError = daySelect.nextElementSibling;
    
    let isValid = true;
    
    // 验证年份
    if (!yearSelect.value) {
        yearError.textContent = '请选择出生年份';
        isValid = false;
    } else {
        yearError.textContent = '';
    }
    
    // 验证月份
    if (!monthSelect.value) {
        monthError.textContent = '请选择出生月份';
        isValid = false;
    } else {
        monthError.textContent = '';
    }
    
    // 验证日期
    if (!daySelect.value) {
        dayError.textContent = '请选择出生日期';
        isValid = false;
    } else {
        dayError.textContent = '';
    }
    
    return isValid;
}

/**
 * 验证表单第三步
 */
function validateStep3() {
    const hourSelect = document.getElementById('birthHour');
    const birthPlace = document.getElementById('birthPlace');
    const phone = document.getElementById('phone');
    const privacyAgreement = document.getElementById('privacyAgreement');
    
    const hourError = hourSelect.nextElementSibling;
    const placeError = birthPlace.nextElementSibling;
    const phoneError = document.querySelector('.phone-input-container').nextElementSibling;
    const privacyError = privacyAgreement.parentElement.nextElementSibling;
    
    let isValid = true;
    
    // 验证时辰
    if (!hourSelect.value) {
        hourError.textContent = '请选择出生时辰';
        isValid = false;
    } else {
        hourError.textContent = '';
    }
    
    // 验证出生地点
    if (!birthPlace.value.trim()) {
        placeError.textContent = '请输入出生地点';
        isValid = false;
    } else {
        placeError.textContent = '';
    }
    
    // 验证电话
    if (!phone.value.trim()) {
        phoneError.textContent = '请输入电话号码';
        isValid = false;
    } else if (!/^\d{5,15}$/.test(phone.value.trim())) {
        phoneError.textContent = '请输入有效的电话号码';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }
    
    // 验证隐私协议
    if (!privacyAgreement.checked) {
        privacyError.textContent = '请阅读并同意隐私政策';
        isValid = false;
    } else {
        privacyError.textContent = '';
    }
    
    return isValid;
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    // 已经在步骤验证中实现
}

/**
 * 初始化表单提交
 */
function initFormSubmission() {
    const form = document.getElementById('baziForm');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 验证表单第三步
        if (!validateStep3()) {
            return;
        }
        
        // 显示加载状态
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        try {
            // 收集表单数据
            const formData = {
                name: document.getElementById('name').value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                birthYear: document.getElementById('birthYear').value,
                birthMonth: document.getElementById('birthMonth').value,
                birthDay: document.getElementById('birthDay').value,
                birthHour: document.getElementById('birthHour').value,
                birthPlace: document.getElementById('birthPlace').value,
                countryCode: document.getElementById('countryCode').value,
                phone: document.getElementById('phone').value,
                isLunar: document.getElementById('calendarType').checked
            };
            
            // 创建随机八字数据（模拟）
            const baziData = {
                yearPillar: {
                    tianGan: "庚",
                    diZhi: "午",
                    wuXing: "金"
                },
                monthPillar: {
                    tianGan: "丁",
                    diZhi: "未",
                    wuXing: "火"
                },
                dayPillar: {
                    tianGan: "辛",
                    diZhi: "丑",
                    wuXing: "金"
                },
                hourPillar: {
                    tianGan: "甲",
                    diZhi: "申",
                    wuXing: "木"
                },
                wuXingCount: {
                    "金": 3,
                    "木": 1,
                    "水": 2,
                    "火": 1,
                    "土": 4
                }
            };
            
            // 创建模拟分析结果
            const analysisResult = {
                generalAnalysis: `${formData.name}的八字显示出独特的性格和人生轨迹。通过分析您的天干地支组合，可以看出您具有较强的分析能力和决断力，善于在复杂环境中找到平衡点。您的命盘结构显示出在不同人生阶段将有不同的发展重点，需要注意的是八字中各元素的平衡对您的整体运势至关重要。`,
                
                personality: `您性格温和，做事有条理，善于思考。在面对挑战时，您能够保持冷静，找到解决问题的方法。您注重细节，追求完美，但有时可能过于理想化。建议您培养更多进取心和创新精神，不要过于固守成规，尝试拓展自己的视野和可能性。`,
                
                career: `事业发展方面，您适合从事需要细心和耐心的工作。30-40岁是您事业发展的关键期，有望通过自身努力和贵人相助取得较大突破。建议您发挥自身优势，选择与您性格相符的行业或岗位。在事业发展方面，您最大的优势是分析能力和自律性。而需要克服的障碍是灵活性不足和人际关系处理。`,
                
                love: `在感情方面，您注重真诚和成长，希望与伴侣共同进步。您的八字显示中晚婚更为有利，选择能与您互补的伴侣将带来更和谐的婚姻关系。比较适合您的伴侣类型是稳重的土属性或灵活的水属性人士。在感情维系方面，您需要注意的是增强灵活性和包容心，不要过于苛求完美。`,
                
                health: `健康方面需注意保养消化系统和肝脏。建议保持规律的作息和饮食习惯，避免过度劳累和情绪波动。适当的户外活动和体育锻炼对您的健康大有裨益。根据您八字中五行的分布情况，为保持身体健康的平衡，建议您避免过度劳累，注意劳逸结合，增加绿色蔬菜和富含维生素的食物。`,
                
                wealth: `财运总体平稳，中年后逐渐好转。您适合长期稳健的投资策略，避免短期投机。通过合理规划和适当把握机会，有望实现财务自由。您理财方面的优势是精确分析和风险控制，而需要注意的弱点是可能过于固执，缺乏创新。适合您的投资方式是结构化产品，精细化资产配置。`
            };
            
            // 将数据存储到sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(formData));
            sessionStorage.setItem('baziData', JSON.stringify(baziData));
            sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
            
            // 模拟API延迟
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 跳转到结果页面
            window.location.href = 'result.html';
            
        } catch (error) {
            console.error('提交表单出错:', error);
            alert('提交失败，请稍后重试。');
        } finally {
            // 隐藏加载状态
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
        }
    });
}

/**
 * 初始化隐私政策弹窗
 */
function initPrivacyModal() {
    const privacyLink = document.getElementById('privacyLink');
    const privacyModal = document.getElementById('privacyModal');
    const closeModal = document.querySelector('.close-modal');
    const acceptBtn = document.getElementById('acceptPrivacy');
    const privacyCheckbox = document.getElementById('privacyAgreement');
    
    if (!privacyLink || !privacyModal) return;
    
    // 打开隐私政策弹窗
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.classList.add('active');
    });
    
    // 关闭隐私政策弹窗
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            privacyModal.classList.remove('active');
        });
    }
    
    // 接受隐私政策
    if (acceptBtn && privacyCheckbox) {
        acceptBtn.addEventListener('click', function() {
            privacyCheckbox.checked = true;
            privacyModal.classList.remove('active');
            
            // 清除错误提示
            const errorMessage = privacyCheckbox.parentElement.nextElementSibling;
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
    }
    
    // 点击模态窗口外部关闭
    privacyModal.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.classList.remove('active');
        }
    });
}

/**
 * 初始化折叠/展开功能
 */
function initAccordion() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('collapsed');
        });
    });
}

/**
 * 初始化分享功能
 */
function initSharing() {
    const shareBtn = document.getElementById('shareBtn');
    const shareResultBtn = document.getElementById('shareResult');
    const shareModal = document.getElementById('shareModal');
    const closeModal = shareModal ? shareModal.querySelector('.close-modal') : null;
    const shareOptions = document.querySelectorAll('.share-option');
    
    // 打开分享弹窗
    function openShareModal() {
        if (shareModal) {
            shareModal.classList.add('active');
        }
    }
    
    // 分享按钮点击事件
    if (shareBtn) {
        shareBtn.addEventListener('click', openShareModal);
    }
    
    if (shareResultBtn) {
        shareResultBtn.addEventListener('click', openShareModal);
    }
    
    // 关闭分享弹窗
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    }
    
    // 点击模态窗口外部关闭
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === shareModal) {
                shareModal.classList.remove('active');
            }
        });
    }
    
    // 处理分享选项点击
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // 获取分享URL
            const shareUrl = window.location.href;
            
            // 根据平台处理分享
            switch (platform) {
                case 'wechat':
                    alert('请使用微信扫一扫功能分享');
                    break;
                case 'weibo':
                    window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('我的八字分析结果')}`);
                    break;
                case 'qq':
                    window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('我的八字分析结果')}`);
                    break;
                case 'copy':
                    navigator.clipboard.writeText(shareUrl)
                        .then(() => alert('链接已复制到剪贴板'))
                        .catch(err => console.error('复制失败:', err));
                    break;
            }
            
            // 关闭弹窗
            shareModal.classList.remove('active');
        });
    });
}

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 从sessionStorage加载结果数据并显示
 */
function loadResultData() {
    // 获取保存的数据
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const baziData = JSON.parse(sessionStorage.getItem('baziData') || '{}');
    const analysisResult = JSON.parse(sessionStorage.getItem('analysisResult') || '{}');
    
    // 如果没有数据，可能是用户直接访问了结果页面
    if (Object.keys(userData).length === 0 || Object.keys(baziData).length === 0) {
        // 这里可以选择重定向到表单页，或者显示演示数据
        console.log('没有找到用户数据，显示演示数据');
        displayDemoData();
        return;
    }
    
    // 显示用户信息
    displayUserInfo(userData);
    
    // 显示八字基本信息
    displayBaziInfo(baziData);
    
    // 显示分析结果
    displayAnalysisResult(analysisResult);
    
    // 设置分析日期为今天
    document.getElementById('analysisDate').textContent = new Date().toLocaleDateString('zh-CN');
}

/**
 * 显示用户信息
 */
function displayUserInfo(userData) {
    const nameElem = document.getElementById('userName');
    const genderElem = document.getElementById('userGender');
    const birthInfoElem = document.getElementById('userBirthInfo');
    const birthPlaceElem = document.getElementById('userBirthPlace');
    
    if (nameElem) nameElem.textContent = userData.name;
    if (genderElem) genderElem.textContent = userData.gender === 'male' ? '男' : '女';
    
    if (birthInfoElem) {
        const lunarText = userData.isLunar ? '农历' : '公历';
        birthInfoElem.textContent = `${lunarText} ${userData.birthYear}年${userData.birthMonth}月${userData.birthDay}日 ${getChineseHour(userData.birthHour)}`;
    }
    
    if (birthPlaceElem) birthPlaceElem.textContent = userData.birthPlace;
}

/**
 * 获取中文时辰表示
 */
function getChineseHour(hour) {
    const hourMap = {
        '0': '子时 (23:00-01:00)',
        '1': '丑时 (01:00-03:00)',
        '2': '寅时 (03:00-05:00)',
        '3': '卯时 (05:00-07:00)',
        '4': '辰时 (07:00-09:00)',
        '5': '巳时 (09:00-11:00)',
        '6': '午时 (11:00-13:00)',
        '7': '未时 (13:00-15:00)',
        '8': '申时 (15:00-17:00)',
        '9': '酉时 (17:00-19:00)',
        '10': '戌时 (19:00-21:00)',
        '11': '亥时 (21:00-23:00)',
        '12': '不详'
    };
    
    return hourMap[hour] || '不详';
}

/**
 * 显示八字基本信息
 */
function displayBaziInfo(baziData) {
    // 设置天干地支
    const yearTG = document.getElementById('yearTG');
    const yearDZ = document.getElementById('yearDZ');
    const yearElement = document.getElementById('yearElement');
    
    const monthTG = document.getElementById('monthTG');
    const monthDZ = document.getElementById('monthDZ');
    const monthElement = document.getElementById('monthElement');
    
    const dayTG = document.getElementById('dayTG');
    const dayDZ = document.getElementById('dayDZ');
    const dayElement = document.getElementById('dayElement');
    
    const hourTG = document.getElementById('hourTG');
    const hourDZ = document.getElementById('hourDZ');
    const hourElement = document.getElementById('hourElement');
    
    if (yearTG) yearTG.textContent = baziData.yearPillar.tianGan;
    if (yearDZ) yearDZ.textContent = baziData.yearPillar.diZhi;
    if (yearElement) yearElement.textContent = baziData.yearPillar.wuXing;
    
    if (monthTG) monthTG.textContent = baziData.monthPillar.tianGan;
    if (monthDZ) monthDZ.textContent = baziData.monthPillar.diZhi;
    if (monthElement) monthElement.textContent = baziData.monthPillar.wuXing;
    
    if (dayTG) dayTG.textContent = baziData.dayPillar.tianGan;
    if (dayDZ) dayDZ.textContent = baziData.dayPillar.diZhi;
    if (dayElement) dayElement.textContent = baziData.dayPillar.wuXing;
    
    if (hourTG) hourTG.textContent = baziData.hourPillar.tianGan;
    if (hourDZ) hourDZ.textContent = baziData.hourPillar.diZhi;
    if (hourElement) hourElement.textContent = baziData.hourPillar.wuXing;
    
    // 设置五行统计
    const wuXingCount = baziData.wuXingCount;
    if (!wuXingCount) return;
    
    const total = Object.values(wuXingCount).reduce((a, b) => a + b, 0);
    
    // 更新五行条形图
    const metalBar = document.getElementById('metalBar');
    const metalValue = document.getElementById('metalValue');
    const woodBar = document.getElementById('woodBar');
    const woodValue = document.getElementById('woodValue');
    const waterBar = document.getElementById('waterBar');
    const waterValue = document.getElementById('waterValue');
    const fireBar = document.getElementById('fireBar');
    const fireValue = document.getElementById('fireValue');
    const earthBar = document.getElementById('earthBar');
    const earthValue = document.getElementById('earthValue');
    
    if (metalBar && metalValue) {
        metalBar.style.width = `${(wuXingCount.金 / total) * 100}%`;
        metalValue.textContent = wuXingCount.金;
    }
    
    if (woodBar && woodValue) {
        woodBar.style.width = `${(wuXingCount.木 / total) * 100}%`;
        woodValue.textContent = wuXingCount.木;
    }
    
    if (waterBar && waterValue) {
        waterBar.style.width = `${(wuXingCount.水 / total) * 100}%`;
        waterValue.textContent = wuXingCount.水;
    }
    
    if (fireBar && fireValue) {
        fireBar.style.width = `${(wuXingCount.火 / total) * 100}%`;
        fireValue.textContent = wuXingCount.火;
    }
    
    if (earthBar && earthValue) {
        earthBar.style.width = `${(wuXingCount.土 / total) * 100}%`;
        earthValue.textContent = wuXingCount.土;
    }
}

/**
 * 显示分
 * 
 /**
 * 显示分析结果
 */
function displayAnalysisResult(analysisResult) {
    // 更新各部分分析内容
    const generalAnalysisText = document.getElementById('generalAnalysisText');
    const personalityText = document.getElementById('personalityText');
    const careerText = document.getElementById('careerText');
    const loveText = document.getElementById('loveText');
    const healthText = document.getElementById('healthText');
    const wealthText = document.getElementById('wealthText');
    
    if (generalAnalysisText) generalAnalysisText.textContent = analysisResult.generalAnalysis || '暂无分析';
    if (personalityText) personalityText.textContent = analysisResult.personality || '暂无分析';
    if (careerText) careerText.textContent = analysisResult.career || '暂无分析';
    if (loveText) loveText.textContent = analysisResult.love || '暂无分析';
    if (healthText) healthText.textContent = analysisResult.health || '暂无分析';
    if (wealthText) wealthText.textContent = analysisResult.wealth || '暂无分析';
}

/**
 * 显示演示数据
 */
function displayDemoData() {
    // 模拟用户数据
    const userData = {
        name: '张三',
        gender: 'male',
        birthYear: 1990,
        birthMonth: 8,
        birthDay: 15,
        birthHour: 6,
        birthPlace: '北京市海淀区',
        isLunar: false
    };
    
    // 模拟八字数据
    const baziData = {
        yearPillar: {
            tianGan: "庚",
            diZhi: "午",
            wuXing: "金"
        },
        monthPillar: {
            tianGan: "丁",
            diZhi: "未",
            wuXing: "火"
        },
        dayPillar: {
            tianGan: "辛",
            diZhi: "丑",
            wuXing: "金"
        },
        hourPillar: {
            tianGan: "甲",
            diZhi: "申",
            wuXing: "木"
        },
        wuXingCount: {
            "金": 3,
            "木": 1,
            "水": 2,
            "火": 1,
            "土": 4
        }
    };
    
    // 模拟分析结果
    const analysisResult = {
        generalAnalysis: '这是一份演示数据，请通过表单提交您的个人信息，获取真实的八字分析结果。',
        personality: '性格温和，做事有条理，善于思考。',
        career: '事业发展平稳，中年有贵人相助。',
        love: '感情生活丰富，婚姻和睦。',
        health: '身体健康，注意保养肝脏。',
        wealth: '财运平稳，中年后逐渐好转。'
    };
    
    // 显示数据
    displayUserInfo(userData);
    displayBaziInfo(baziData);
    displayAnalysisResult(analysisResult);
    
    // 设置分析日期为今天
    const analysisDateElem = document.getElementById('analysisDate');
    if (analysisDateElem) {
        analysisDateElem.textContent = new Date().toLocaleDateString('zh-CN');
    }
}

/**
 * 初始化服务选择按钮
 */
function initServiceSelection() {
    const basicServiceBtn = document.querySelector('#basicService .service-btn');
    const premiumServiceBtn = document.querySelector('#premiumService .service-btn');
    const consultBtn = document.getElementById('consultBtn');
    
    // 基础服务选择
    if (basicServiceBtn) {
        basicServiceBtn.addEventListener('click', function() {
            // 这里可以添加跳转到支付页面或其他操作
            alert('您已选择40分钟专项咨询服务，价格¥388');
            // 实际项目中，这里应该跳转到结算页面
            // window.location.href = 'checkout.html?service=basic';
        });
    }
    
    // 高级服务选择
    if (premiumServiceBtn) {
        premiumServiceBtn.addEventListener('click', function() {
            // 这里可以添加跳转到支付页面或其他操作
            alert('您已选择2小时全面测算服务，价格¥1200');
            // 实际项目中，这里应该跳转到结算页面
            // window.location.href = 'checkout.html?service=premium';
        });
    }
    
    // 咨询按钮
    if (consultBtn) {
        consultBtn.addEventListener('click', function() {
            // 滚动到服务选择区
            const servicesSection = document.querySelector('.premium-services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * 初始化模态窗口
 */
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // 关闭按钮事件
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // 点击模态窗口外部关闭
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}