import { faHome, faUsers, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";

export const navbarData = [
    {
        routerLink:'/hr',
        icon:faHome,
        label:'Dashboard'
    },
    {
        routerLink:'empdetails',
        icon:faUsers,
        label:'Employee Details'
    },
    {
        routerLink:'createemp',
        icon:faUserPlus,
        label:'Create Employee'
    },
    {
        routerLink:'profile',
        icon:faUser,
        label:'Profile'
    },
    // {
    //     routerLink:'createemp',
    //     icon:faUserPlus,
    //     label:'Leave Application'
    // }
]