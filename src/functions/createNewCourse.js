
import axios from "axios";
import { API } from "../constant";

export const createNewCourse = async () => {
    const data = {
        setting: {
            max_student: 10,
            difficulty_level: "begginner",
            expiration: 6,
            qna: false
        },
        additional: {
            course_duration: {
                hours: 0,
                minute: 0
            },
            motivation: "",
            target_audience: "",
            materials: "",
            requirements: []
        },
        course_type: "free",
        title: "New Course",
        description: "<p>Course Description</p>",
        slug: `new-course-${new Date().getTime()}`,
        course_price: 0,
        discount_price: 0,
        thumbnail: "",
        video: "",
        video_type: "none",
        content_drip: {
            enabled: false,
            drip_type: "none"
        },
        topics: [],
        status: "publish"
    };

    return axios.post(`${API}/course`, data, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })

}