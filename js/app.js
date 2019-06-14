var botui = new BotUI('my-botui-app');
var hasHistory;
var takePill;

var checkHasHistory = function() {
    return hasHistory == 'yes';
}

var checkTakePill = function() {
    return takePill == 'yes';
}

var startAction = function() {
    selectedHistory = '';
    takePill = null;
    return botui.message.bot({ // show a message
        delay: 500,
        loading: true,    
        content: 'Our doctors have put together this quiz to help you get personalised recommendations. If you would like a prescribed contraceptive, you will need to complete an assessment with us or with your GP.'
    }).then(function() {
        return whatTypeAction();
    });
}

var whatTypeAction = function() {
    return botui.message.bot({ // show a message
        delay: 500,
        loading: true,    
        content: 'What type of contraceptive are you interested in?'
    }).then(function() {
        return botui.action.button({
            delay: 500,
            loading: true,    
            action: [
                { 
                    text: 'Hormonal',
                    value: 'hormonal'
                },
                { 
                    text: 'Non-hormonal',
                    value: 'nonhormonal'
                },
                { 
                    text: 'What\'s the difference?',
                    value: 'difference'
                },
                { 
                    text: 'I don\'t mind',
                    value: 'dontmind'
                }
            ]
        }); 
    }).then(function(res) {
        switch (res.value) {
            case 'nonhormonal':
                return nonhormonalAction();
            case 'difference':
                return differenceAction();
            case 'hormonal':
            case 'dontmind':
                return historyAction();
        }
    });    
}

var differenceAction = function() {
    return botui.message.bot({ 
        delay: 500,
        loading: true,    
        content: 'Contraceptives can broadly be split into two types: those with hormones (hormonal) and those without (non-hormonal).'
    }).then(function(){
        return botui.message.bot({ 
            delay: 500,
            loading: true,    
            content: 'Hormonal contraceptives work by altering your body\'s natural hormone levels, which in turn makes changes to your cycle (for example, by preventing your ovaries from releasing an egg which could be fertilised, or making the lining of the womb less hospitable to implantation of an embryo). The hormones used are similar to what your body produces already (oestrogen and progesterone), but just in a more regulated dose.'
        });
    }).then(function(){
        return botui.message.bot({ 
            delay: 500,
            loading: true,    
            content: 'Non-hormonal contraceptives work by purely physical means, such as by preventing sperm getting to the egg (condoms, diaphragms, caps), or preventing implantation by creating a physical impediment (the copper coil or IUD).'
        });
    }).then(function() {
        return whatTypeAction();
    });
}

var nonhormonalAction = function() {
    return botui.message.bot({ // show a message
        delay: 500,
        loading: true,    
        content: 'There are a variety of non-hormonal contraceptives you can try. These include the IUD (copper coil), condoms, the diaphragm or the cervical cap, the contraceptive sponge, or sterilisation. Click on the links to find out more about them. Unfortunately, we don\'t sell non-hormonal contraceptives yet at Zava but you can always visit your GP or a family planning clinic.'
    }).then(function(){
        return botui.message.bot({ // show a message
            delay: 500,
            loading: true,    
            content: '[Find nearest clinic](https://www.nhs.uk/service-search/Family-planning/LocationSearch/1863)'
        })
    });
}

var historyAction = function() {
    return botui.message.bot({ // show a message
        delay: 500,
        loading: true,    
        content: 'Do you have a history of any of the following?'
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'Migraine'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'Breast cancer'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'Liver disease'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'High blood pressure'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'Blood clots or bleeding disorders'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'Heart or vascular condition'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: '>35yrs of age and smoke'
        });
    }).then(function() {
        return botui.message.bot({ // show a message
            delay: 50,
            content: 'BMI >35kg/m2'
        });
    }).then(function(){
        return botui.action.button({
            delay: 500,
            loading: true,    
            action: [
                { 
                    text: 'Yes',
                    value: 'yes'
                },
                { 
                    text: 'No',
                    value: 'no'
                }
            ]
        }); 
    }).then(function (res) { 
        hasHistory = res.value;
        return botui.message.bot({ 
            delay: 500,
            loading: true,    
            content: 'Are you happy to take a pill?'
        })
    }).then(function () { 
        return botui.action.button({
            delay: 500,
            loading: true,    
            action: [
                { 
                    text: 'Yes',
                    value: 'yes'
                },
                { 
                    text: 'No',
                    value: 'no'
                }
            ]
        }); 
    }).then(function (res) {
        takePill = res.value;
        console.log('check has history? ' + checkHasHistory());
        console.log('check take pill? ' + checkTakePill());
        if (checkHasHistory()) {
            if (checkTakePill()) {
                return popAction();
            } else {
                return notReadyAction();
            }
        } else {
            if (checkTakePill()) {
                return popAction();
            } else {
                return notReadyAction();
            }
        }
    });
};

var popAction = function() {
    return botui.message.bot({ 
        delay: 500,
        loading: true,    
        content: 'The best option for you is a progesterone-only pill, such as [Cerazette](https://www.zavamed.com/uk/cerazette.html) or [Cerelle](https://www.zavamed.com/uk/cerelle.html)'
    }).then(function(){
        return botui.message.bot({ 
            delay: 500,
            loading: true,    
            content: 'You are likely to benefit from a [progesterone-only pill](https://www.zavamed.com/uk/progesterone-pills.html) (POP or mini-pill). This might be because a combined contraceptive (one with oestrogen in it too) would be too high risk for you. The mini-pill is taken daily without a break, and usually (after about 6 months) causes women to have less frequent and lighter periods. We would recommend starting on [Cerazette](https://www.zavamed.com/uk/cerazette.html) or [Cerelle](https://www.zavamed.com/uk/cerelle.html), both of which have a 12 hour window in case you\'re late remembering to take it. Our doctors at Zava can provide you with a prescription and our pharmacy will dispatch it to your doorstep.'
        });
    }).then(function(){
        return botui.message.bot({ 
            delay: 50,
            loading: false,    
        content: '![progesterone-only pill](./img/pop.png)'
        });
    });
}

var notReadyAction = function() {
    return botui.message.bot({ 
        delay: 500,
        loading: true,    
        content: 'This branch is not ready.'
    })
}

startAction();



