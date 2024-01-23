import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    show_sidebar: false,
    showNavProfile: false,
    image_uploading: false,
    showCourseContentSidebar: true,
    image: "",
    themeMode: "light",
    dropdown: {
        courseDD: false,
        bePartnerDD: false,
        mobileCourseDD: false,
        mobileMenu: false
    }
}

const appsetting = createSlice({
    name: 'appsetting',
    initialState,
    reducers: {
        setTheme: (state, {payload}) => {
            const b = document.getElementsByTagName("body")[0];
            state.themeMode = payload;
            localStorage.setItem("themeMode", payload);
            b.setAttribute("data-theme", payload);
        },
        toggleTheme: (state) => {
            console.log("ToggleTheme");
            const b = document.getElementsByTagName("body")[0];
            
            localStorage.setItem("selectTheme", "user");
            if(state.themeMode === "dark"){
                state.themeMode = "light"
                localStorage.setItem("themeMode", "light");
                b.setAttribute("data-theme", "light");
            }else{
                state.themeMode = "dark"
                localStorage.setItem("themeMode", "dark");
                b.setAttribute("data-theme", "dark");
            }
        },
        toggleSidebar: (state) => {
            state.show_sidebar = !state.show_sidebar;
        },
        hideSidebar: (state) => {
            state.show_sidebar = false;
        },
        toggleNavProfile: (state) => {
            state.showNavProfile = !state.showNavProfile
        },
        showNavProfileFunc: (state) => {
            state.showNavProfile = true
        },
        hideNavProfile: (state) => {
            state.showNavProfile = false
        },
        toggleCourseDropdown: (state) => {
            state.dropdown.courseDD = !state.dropdown.courseDD
        },
        toggleFranchiseDD: (state) => {
            state.dropdown.bePartnerDD = !state.dropdown.bePartnerDD
        },
        hideAllNavMenu: (state) => {
            state.dropdown.courseDD = false;
            state.dropdown.bePartnerDD = false;
            state.showNavProfile = false;
            state.show_sidebar = false;
            state.dropdown.mobileCourseDD = false
            state.dropdown.mobileMenu = false
        },
        showMobileMenu: (state) => {
            state.dropdown.mobileMenu = true;
        },
        hideMobileMenu: (state) => {
            state.dropdown.mobileMenu = false;
        },
        showMobileCourseMenu: (state) => {
            state.dropdown.mobileCourseDD = true;
        },
        hideMobileCourseMenu: (state) => {
            state.dropdown.mobileCourseDD = false
        },
        toggleCourseContentSidebar: (state) => {
            state.showCourseContentSidebar = !state.showCourseContentSidebar
        },
        hideCourseContentSidebar: (state) => {
            state.showCourseContentSidebar = false
        },
    }
})

export const { toggleSidebar, hideSidebar, toggleFranchiseDD,
    toggleNavProfile, showNavProfileFunc, hideNavProfile,
    toggleCourseDropdown,
    hideAllNavMenu, showMobileCourseMenu,
    hideMobileCourseMenu,
    showMobileMenu, hideMobileMenu, toggleCourseContentSidebar,
    hideCourseContentSidebar, setTheme, toggleTheme
} = appsetting.actions;


export default appsetting.reducer;