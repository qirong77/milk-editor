var lottery_initial_datas =[
    	{
        "nameen": "avatar1",
        "namezh": "蔡哲明",
        "state": false
       	},
        {
        "nameen": "avatar2",
        "namezh": "陈凯鸿",
        "state": false
        }
        ,
        {
        "nameen": "avatar3",
        "namezh": "陈麒源",
        "state": false
        },
        {
        "nameen": "avatar4",
        "namezh": "陈哲奥",
        "state": true
        }
        ,
        {
        "nameen": "avatar5",
        "namezh": "林源鑫",
        "state": true
        }
        ,
        {
        "nameen": "avatar6",
        "namezh": "林哲豪",
        "state": false
        }
        ,
        {
        "nameen": "avatar7",
        "namezh": "魏以臻",
        "state": false
        },
        {
        "nameen": "avatar8",
        "namezh": "黄纪初",
        "state": true
        },
        {
        "nameen": "avatar9",
        "namezh": "庄浩辉",
        "state": false
        },   
        {
        "nameen": "avatar10",
        "namezh": "王泽奇",
        "state": false
        },
        {
        "nameen": "avatar11",
        "namezh": "林枭",
        "state": false
        },
        {
        "nameen": "avatar12",
        "namezh": "吴勉",
        "state": false
        }
        ,
        {
        "nameen": "avatar13",
        "namezh": "陈均熠",
        "state": false
        }
        ,
        {
        "nameen": "avatar14",
        "namezh": "陈仁杰",
        "state": true
        },
        {
        "nameen": "avatar15",
        "namezh": "李茂然",
        "state": true
        }
        ,
        {
        "nameen": "avatar16",
        "namezh": "林继超",
        "state": false
        }
        ,
        {
        "nameen": "avatar17",
        "namezh": "曾宇晨",
        "state": true
        },
        {
        "nameen": "avatar18",
        "namezh": "林弘为",
        "state": false
        },
        {
        "nameen": "avatar19",
        "namezh": "罗景荣",
        "state": false
        },
        {
        "nameen": "avatar20",
        "namezh": "陈燕华",
        "state": false
        }
        ,
        {
        "nameen": "avatar21",
        "namezh": "洪琦贤",
        "state": true
        },
        {
        "nameen": "avatar22",
        "namezh": "刘煜晗",
        "state": true
        }
        ,
        {
        "nameen": "avatar23",
        "namezh": "林宇菁",
        "state": false
        },
        {
        "nameen": "avatar24",
        "namezh": "卢诗颖",
        "state": false
        }
        ,
        {
        "nameen": "avatar25",
        "namezh": "郑琴路",
        "state": false
        }
        ,
        {
        "nameen": "avatar26",
        "namezh": "叶阳",
        "state": false
        },
        {
        "nameen": "avatar27",
        "namezh": "刘泽槟",
        "state": false
        }
        ,
        {
        "nameen": "avatar28",
        "namezh": "林秋林",
        "state": false
        }
        ,
        {
        "nameen": "avatar29",
        "namezh": "方芳",
        "state": true
        },
        {
        "nameen": "avatar30",
        "namezh": "黄海",
        "state": false
        }
        ,
        {
        "nameen": "avatar31",
        "namezh": "张凯",
        "state": false
        }
        ,
        {
        "nameen": "avatar32",
        "namezh": "陈乾泰",
        "state": false
        },
        {
        "nameen": "avatar33",
        "namezh": "张建贤",
        "state": false
        },
        {
        "nameen": "avatar34",
        "namezh": "林涛",
        "state": false
       },
        {
        "nameen": "avatar35",
        "namezh": "郑凌寒",
        "state": false
        },
        {
        "nameen": "avatar36",
        "namezh": "姚跃林",
        "state": false
        },
        {
        "nameen": "avatar37",
        "namezh": "曾泽凯",
        "state": false
        },
        {
        "nameen": "avatar38",
        "namezh": "施凯",
        "state": false
        }
];

var award_config = {
    "award01": 1,
    "award02": 3,
    "award03": 6,
    "award04": 9//抽奖次数
};

// 初始化数据
//初始化抽奖号
if (!localStorage.getItem('lottery_initial')) {
    var data_str = JSON.stringify(lottery_initial_datas);
    localStorage.setItem('lottery_initial', data_str);
}
//初始化抽奖次数
if (!localStorage.getItem('award_initial')) {
    var award_str = JSON.stringify(award_config);
    localStorage.setItem('award_initial', award_str);
}