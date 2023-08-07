import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API } from '../constant';


export const getAllCourse = createAsyncThunk(
  "course/getAllCourse",
  async ({ perPage, pageNo, category, subcategory }) => {
    let apiBasestring = `${API}/course/page/${pageNo}?perPage=${perPage}`;
    if (category !== undefined && category.length > 0) {
      apiBasestring += `&category=${category}`
      if (subcategory !== undefined && subcategory.length > 0) {
        apiBasestring += `&subcategory=${subcategory}`
      }
    }
    const response = await axios.get(apiBasestring, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

// get courses enrolled for student 
export const getStudentCourses = createAsyncThunk(
  "course/getCoursesByAuth",
  async () => {
    const response = await axios.get(`${API}/course`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
    return response.data;
  });

// get course created by teacher 
export const getTeacherCourses = createAsyncThunk(
  "course/getTeacherCourses",
  async ({ pageNo, perPage, status }) => {
    const response = await axios.get(`${API}/course/teacher/page/${pageNo}?perPage=${perPage}&status=${status}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
    return response.data;
  });

// get course by id with all data populated
export const getTeacherCourseByID = createAsyncThunk(
  "course/getTeacherCourseByID",
  async (courseId) => {
    const response = await axios.get(`${API}/course/teacher/${courseId}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
    return response.data;
  }
)


// add topic in course 
export const addNewTopic = createAsyncThunk(
  "course/addNewTopic",
  async ({ course, topic }) => {
    const response = await axios.patch(`${API}/course/add/topic/${course}`, topic, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

    return response.data;
  }
)

// add item in topic 
export const addItemByTopicId = createAsyncThunk(
  "course/addItemByTopicId",
  async ({ data, topicId }) => {
    const response = await axios.patch(`${API}/topic/add/item/${topicId}`, data, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

    return response.data;
  }
)

//  delete course by course id 
export const removeCourseById = createAsyncThunk(
  "course/removeCourseById",
  async ({ courseId }) => {
    // delete course by id

    if (!courseId || courseId === "" || courseId === undefined) return;

    const response = await axios.delete(`${API}/course/${courseId}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  });

export const getCourseById = createAsyncThunk(
  "course/getCourseById",
  async ({ courseId }) => {
    // get course by id

    if (!courseId || courseId === "" || courseId === undefined) return;

    const response = await axios.get(`${API}/course/purchase/${courseId}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  });

export const searchCourseByName = createAsyncThunk(
  "course/searchCourseByName",
  async (searchText) => {
    // get course by id

    if (!searchText || searchText === "" || searchText === undefined || searchText.length < 3) return;

    const response = await axios.get(`${API}/search/course/title/${searchText}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data;
  })

const initialState = {
  teacher: {
    mycourses: [],
    courseCount: {
      publish: 0,
      pending: 0,
      draft: 0
    },
    edit_course: {
      topics: []
    },
    loadingEditCourse: false,
    editCourseError: false,
    current: {
      quiz_id: ""
    }
  },
  student: {
    pending_courses: [],
    completed_courses: [],
    courses: []
  },
  allCourse: [],
  pagination: [],
  totalCourses: 0,
  pageNo: 1,
  perPage: 10,
  oneCourse: {}
}


const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.teacher.mycourses = [...state.teacher.mycourses, action.payload.course]
    },
    updateCourseByData: (state, action) => {
      const { mycourses } = state.teacher;
      const findIndex = mycourses.findIndex((course) => course._id === action.payload._id);
      if (findIndex === -1) {
        return;
      }
      state.teacher.mycourses[findIndex] = action.payload;
    },
    addIntoPendinCourse: (state, action) => {
      const { course, enrollment } = action.payload;
      state.student.pending_courses = [...state.student.pending_courses, { ...enrollment, course }]
    },
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCourse.fulfilled, (state, action) => {
      state.allCourse = action.payload.course
      state.pagination = action.payload.pagination
      state.totalCourses = action.payload.totalCourses

      if (state.pageNo >= action.payload.pagination) {
        state.pageNo = 1
      }

    })
    builder.addCase(getStudentCourses.fulfilled, (state, action) => {
      state.student.pending_courses = action.payload.pending_courses
      state.student.completed_courses = action.payload.completed_courses
      state.student.courses = [...action.payload?.completed_courses, ...action.payload.pending_courses]
    })
    builder.addCase(getTeacherCourses.fulfilled, (state, action) => {
      const {courses, pagination, courseCount, currentCount, totalDocuments} = action.payload;
      state.teacher.mycourses = courses;
      state.teacher.pagination = pagination
      state.teacher.totalDocuments = totalDocuments
      state.teacher.courseCount = courseCount 
      state.totalCourses = currentCount 
    })

    builder.addCase(getTeacherCourseByID.pending, (state, action) => {
      state.teacher.loadingEditCourse = true
      state.teacher.editCourseError = false
    })
    builder.addCase(getTeacherCourseByID.fulfilled, (state, action) => {
      state.teacher.loadingEditCourse = false
      state.teacher.edit_course = action.payload.course
    })
    builder.addCase(getTeacherCourseByID.rejected, (state, action) => {
      state.teacher.loadingEditCourse = false
      state.teacher.editCourseError = true
    })

    builder.addCase(addNewTopic.fulfilled, (state, action) => {
      state.teacher.edit_course.topics = [...state.teacher.edit_course.topics, {
        topic: action.payload.topic,
        _id: action.payload.topic._id
      }]
    })

    builder.addCase(addItemByTopicId.fulfilled, (state, action) => {
      const { payload: { topic, item, item_type } } = action;
      const { teacher: { edit_course } } = state;

      let newItem = {
        item_type,
        item,
        _id: item._id
      }
      const indx = edit_course.topics.findIndex((single_topic) => single_topic.topic._id === topic);
      if (indx !== -1) {
        edit_course.topics[1].topic.items.push(newItem);
      }

    })

    builder.addCase(removeCourseById.fulfilled, (state, action) => {
      const { status, courseId } = action.payload;
      if (status === "success") {
        let allCourses = state.teacher.mycourses;
        allCourses = allCourses.filter((course) => course._id !== courseId);
        state.teacher.mycourses = allCourses
      }
    })

    builder.addCase(getCourseById.fulfilled, (state, action) => {
      const { status, course } = action.payload;
      if (status === "success") {
        state.oneCourse = course;
      }
    })


  }
})

export const { addCourse, updateCourseByData, addIntoPendinCourse, setPageNo } = courseSlice.actions
export default courseSlice.reducer