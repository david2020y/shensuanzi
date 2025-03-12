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
        loadingOverlay.classList.add('active');
        
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
            
            // 计算八字
            const year = parseInt(formData.birthYear);
            const month = parseInt(formData.birthMonth);
            const day = parseInt(formData.birthDay);
            const hour = parseInt(formData.birthHour);
            
            // 计算八字
            const baziData = BaziCalculator.calculateBazi(year, month, day, hour, formData.isLunar);
            
            // 调用API进行分析
            // 在实际项目中，应该通过后端服务调用DeepSeek API
            // 这里为了演示，我们使用模拟的API调用
            const analysisResult = await ApiService.analyzeBazi(baziData, {
                name: formData.name,
                gender: formData.gender
            });
            
            // 将数据存储到sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(formData));
            sessionStorage.setItem('baziData', JSON.stringify(baziData));
            sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
            
            // 跳转到结果页面
            window.location.href = 'result.html';
            
        } catch (error) {
            console.error('提交表单出错:', error);
            alert('提交失败，请稍后重试。');
        } finally {
            // 隐藏加载状态
            loadingOverlay.classList.remove('active');
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
    document.getElementById('yearTG').textContent = baziData.yearPillar.tianGan;
    document.getElementById('yearDZ').textContent = baziData.yearPillar.diZhi;
    document.getElementById('yearElement').textContent = baziData.yearPillar.wuXing;
    
    document.getElementById('monthTG').textContent = baziData.monthPillar.tianGan;
    document.getElementById('monthDZ').textContent = baziData.monthPillar.diZhi;
    document.getElementById('monthElement').textContent = baziData.monthPillar.wuXing;
    
    document.getElementById('dayTG').textContent = baziData.dayPillar.tianGan;
    document.getElementById('dayDZ').textContent = baziData.dayPillar.diZhi;
    document.getElementById('dayElement').textContent = baziData.dayPillar.wuXing;
    
    document.getElementById('hourTG').textContent = baziData.hourPillar.tianGan;
    document.getElementById('hourDZ').textContent = baziData.hourPillar.diZhi;
    document.getElementById('hourElement').textContent = baziData.hourPillar.wuXing;
    
    // 设置五行统计
    const wuXingCount = baziData.wuXingCount;
    const total = Object.values(wuXingCount).reduce((a, b) => a + b, 0);
    
    // 更新五行条形图
    document.getElementById('metalBar').style.width = `${(wuXingCount.金 / total) * 100}%`;
    document.getElementById('metalValue').textContent = wuXingCount.金;
    
    document.getElementById('woodBar').style.width = `${(wuXingCount.木 / total) * 100}%`;
    document.getElementById('woodValue').textContent = wuXingCount.木;
    
    document.getElementById('waterBar').style.width = `${(wuXingCount.水 / total) * 100}%`;
    document.getElementById('waterValue').textContent = wuXingCount.水;
    
    document.getElementById('fireBar').style.width = `${(wuXingCount.火 / total) * 100}%`;
    document.getElementById('fireValue').textContent = wuXingCount.火;
    
    document.getElementById('earthBar').style.width = `${(wuXingCount.土 / total) * 100}%`;
    document.getElementById('earthValue').textContent = wuXingCount.土;
}

/**
 * 显示分析结果
 */
function displayAnalysisResult(analysisResult) {
    // 更新各部分分析内容
    document.getElementById('generalAnalysisText').textContent = analysisResult.generalAnalysis || '暂无分析';
    document.getElementById('personalityText').textContent = analysisResult.personality || '暂无分析';
    document.getElementById('careerText').textContent = analysisResult.career || '暂无分析';
    document.getElementById('loveText').textContent = analysisResult.love || '暂无分析';
    document.getElementById('healthText').textContent = analysisResult.health || '暂无分析';
    document.getElementById('wealthText').textContent = analysisResult.wealth || '暂无分析';
}

/**
 * 显示演示数据
 */
function displayDemoData() {
    // 生成随机八字数据
    const baziData = BaziCalculator.generateRandomBazi();
    
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
    document.getElementById('analysisDate').textContent = new Date().toLocaleDateString('zh-CN');
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