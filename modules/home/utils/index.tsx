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
    },
    {
        id: 'h2y45ybkjn',
        name: 'Kishan Somani',
        goingTo: 'Leh',
        goingOnDate: '02-02-2023',
        travelMedium: 'Motorcycle',
        description: 'jkadfjkbkabdfkabdfs',
        interested: [],
        tag: 'MOUNTAIN',
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
    }
]

export const tagBackgroundFinder = (tag: DUMMY_ENTITY['tag']) => {
    let list = {
        'BEACH': '/cardImage/beach-1.webp',
        'MOUNTAIN': '/cardImage/mountain-1.jpg'
    }
    return list[tag]
}

export const randomGradientTheme = ['linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)', 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)', '']