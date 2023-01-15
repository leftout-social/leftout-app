import RssFeedIcon from '@mui/icons-material/RssFeed';
import InterestsIcon from '@mui/icons-material/Interests';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const TABS = [
    {
        id: 1,
        title: 'Feed',
        icon: <RssFeedIcon />,
        path: '/',
        background: '#42C2FF',
        fontColor: '#000000',
    },
    {
        id: 2,
        title: 'Interested',
        icon: <InterestsIcon />,
        path: '/interested-trips',
        background: '#FFDCA9',
        fontColor: '#000000',
    },
    {
        id: 3,
        title: 'Profile',
        icon: <AccountCircleIcon />,
        path: '/profile',
        background: '#A0BCC2',
        fontColor: '#ffffff',
    }

];

export type DUMMY_ENTITY = {
    id: string
    name: string
    goingTo: string
    goingOnDate: string
    travelMedium: string
    description: string
    interested: string[]
    tag: 'BEACH' | 'MOUNTAIN'
    tripStartDate?: string;
    tripEndDate?: string;
}
export const DummyFeedList: DUMMY_ENTITY[] = [
    {
        id: 'fjkadshfukhi',
        name: 'Deepanshu Somani',
        goingTo: 'Kasol',
        goingOnDate: '02-02-2023',
        travelMedium: 'Train & Bus',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'MOUNTAIN',
        tripStartDate: 'Jan 03 2023',
        tripEndDate: 'Jan 15 2023'
    },
    {
        id: 'h2y45ybkjn',
        name: 'Kishan Kumar',
        goingTo: 'Leh',
        goingOnDate: '02-02-2023',
        travelMedium: 'Motorcycle',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'MOUNTAIN',
        tripStartDate: 'Jan 03 2023',
        tripEndDate: 'Jan 15 2023'
    },
    {
        id:'nswh78234bjfn98n',
        name: 'Pratyaksh Singh',
        goingTo: 'Banglore',
        goingOnDate: '02-02-2023',
        travelMedium: 'Flight & Bus',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'BEACH',
        tripStartDate: 'Jan 15 2023',
        tripEndDate: 'Jan 15 2023'
    },
    {
        id: '3brkquytb13',
        name: 'Deepanshu Somani',
        goingTo: 'Kasol',
        goingOnDate: '02-02-2023',
        travelMedium: 'Train & Bus',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'BEACH',
        tripStartDate: 'Jan 15 2023',
        tripEndDate: 'Jan 15 2023'
    },
    {
        id: 'ngh235ubk',
        name: 'Deepanshu Somani',
        goingTo: 'Kasol',
        goingOnDate: '02-02-2023',
        travelMedium: 'Train & Bus',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'MOUNTAIN',
        tripStartDate: 'Jan 15 2023',
        tripEndDate: 'Mar 15 2023'
    }
]

export const tagBackgroundFinder = (tag: DUMMY_ENTITY['tag']) => {
    let list = {
        'BEACH': 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',
        'MOUNTAIN': 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'
    }
    return list[tag]
}

export const randomGradientTheme = ['linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)', 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)', '']