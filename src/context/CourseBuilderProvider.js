import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { API } from '../constant';
import { useDispatch } from 'react-redux';
import { updateCourseByData } from '../reducers/CourseReducer';

const newCourseCtx = createContext();

export const useCourse = () => useContext(newCourseCtx);

const CourseBuilderProvider = ({ children }) => {

   const dispatch = useDispatch();

   const [quizPage, setQuizPage] = useState(1)
   const [quizAdded, setQuizAdded] = useState(false);

   const [showTopicForm, setShowTopicForm] = useState(false);

   // set quiz form toggle state 
   const [showQuizForm, setShowQuizForm] = useState(false);

   // set assignment form toggle state 
   const [showAssignmentForm, setShowAssignmentForm] = useState(false);

   // show lesson form 
   const [showLessonForm, setShowLessonForm] = useState(false);

   // show recording form 
   const [showRecordingForm, setShowRecordingForm] = useState(false);


   // course data 
   const [courseData, setCourseData] = useState({
      course_type: "free",
      title: "",
      description: "",
      slug: "",
      category: "",
      course_price: 0,
      discount_price: 0,
      course_language: "",
      thumbnail: "",
      video: "",
      video_type: "",
      topics: [],
      content_drip: {
         enabled: false,
         drip_type: ""
      },
      setting: {
         max_student: 10,
         difficulty_level: "begginner",
         expiration: 3,
         start_date: new Date().toISOString(),
         end_date: new Date().toISOString(),
         qna: false
      },
      choose_start_date: true,
      offers: [],
      additional: {
         course_duration: {
            hours: 1,
            minute: 30
         },
         motivation: "",
         target_audience: "",
         materials: "",
         requirements: ""
      },
      batch: {
         batch_timing: {
            start: "",
            end: ""
         },
         batch_days: []
      },
      affiliate: {
         discount_type: "amount",
         discount: 0
      },
      franchise: {
         discount_type: "amount",
         discount: 0
      },
      business_associate: {
         discount_type: "amount",
         discount: 0
      },
      ms_team_link: ""
   });

   // topic data 
   const [topicData, setTopicData] = useState({
      title: "",
      description: "",
      items: [],
      preview_available: false
   })

   // quiz data 
   const [quizData, setQuizData] = useState({
      quiz_title: "",
      quiz_description: "",
      time_limit: {
         limit: 60,
         limit_type: "minute",
         show_time_limit: false
      },
      feedback_mode: "default",
      passing_mark: 80,
      max_answers: 10,
      advance: {
         auto_start_quiz: false,
         show_question_number: false,
         short_answer_limit: 200,
         essay_limit: 500,
      },
      question_layout: "single_question",
      question_order: "random",
      questions: [],
      preview_available: false
   });

   // question data 
   const [questionData, setQuestionData] = useState({
      question_title: "",
      question_description: "",
      question_img: "",
      point: 1,
      display_point: true,
      options: [
      ],
      ordering: {
         randomize: true,
         orders: [],
         ordering_answer: [],
      },
      matching: {
         option1: [],
         option2: [],
         answer: []
      },
      single_answer: "",
      multi_answer: {
         max_choice: 1,
         answer: []
      },
      image: {
         image_url: "",
         answer: ""
      },
      fill_blanks: {
         title: "",
         answer: "",
      },
      true_false_answer: true,
      question_type: "true_false",
      answer_required: false,
      randomise: true
   });

   // assignment data 
   const [assignmentData, setAssignmentData] = useState({
      course: "",
      title: "",
      description: "",
      unlocking_date: new Date().toISOString(),
      time_limit: 0,
      time_limit_type: "minute",
      total_points: 10,
      passing_point: 5,
      max_uploads: 1,
      max_size: 5,
      assignment_pdf: "",
      preview_available: false
   });

   // lesson data 
   const [lessonData, setLessonData] = useState({
      title: "",
      lesson_content: "",
      featured_image: "",
      video_source: "",
      video_source_type: "none",
      video_source_title: "",
      video_playback_time: {
         hour: 0,
         minute: 0,
         second: 0
      },
      attachments: [],
      preview_available: false,
      pdf_attachment: "",
      pdf_attachment_name: "",
   });

   // recording data 
   const [recordingData, setRecordingData] = useState({
      title: "",
      description: "",
      attachments: [],
      video_source: "",
      video_source_type: "",
      video_source_title: "",
      course: ""
   })

   const [allRecordings, setAllRecordings] = useState([]);

   // selected topic id
   const [topicId, setTopicId] = useState("");
   // selected quiz id
   const [quizId, setQuizId] = useState("");
   // selected assignment id
   const [assignmentId, setAssignmentId] = useState("");
   // selected question id
   const [questionId, setQuestionId] = useState("");
   // selected lesson id
   const [lessonId, setLessonId] = useState("");

   // quiz update data 
   const [topicUpdateData, setTopicUpdateData] = useState({});
   const [quizUpdateData, setQuizUpdateData] = useState({});
   const [assignmentUpdateData, setAssignmentUpdateData] = useState({});
   const [lessonUpdateData, setLessonUpdateData] = useState({});
   const [recordingUpdateData, setRecordingUpdateData] = useState({});


   // update course by id
   const updateCourseData = () => {
      try {
         ["category", "sub_category"].forEach((item) => {
            if (courseData[item] === "" || courseData[item] === undefined || courseData[item] === null) {
               alert(`${item} is required`)
               return;
            }
         })

         const { topics, ...restCoursData } = courseData;
         axios.patch(`${API}/course/update/${courseData._id}`, restCoursData, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               if (res.data.status === "success") {
                  dispatch(updateCourseByData(courseData))
                  alert("Course Updated");
               } else if (res.data.status === "warning") {
                  alert(res.data.message);
               }
            })
      } catch (error) {
         console.warn(error);
      }
   }

   // create new topic 
   const createNewTopic = async (course, topicData) => {
      try {
         const response = await axios.patch(`${API}/course/add/topic/${course}`, topicData, {
            headers: {
               token: localStorage.getItem("token")
            }
         });

         const createdTopic = response.data.topic;
         setCourseData(data => {
            return {
               ...data,
               topics: [...data.topics, { topic: createdTopic, _id: createdTopic._id }]
            }
         })
         setTopicData({
            title: "",
            description: "",
            items: [],
            preview_available: false
         })
      } catch (error) {
         console.log(error);
      }
   }

   // update a topic 
   const updateTopicById = async (topic_id, topicData) => {
      try {
         const response = await axios.patch(`${API}/topic/update/${topic_id}`, topicData, {
            headers: {
               token: localStorage.getItem("token")
            }
         });

         const updatedTopic = response.data.topic;
         // find the topic in course array 
         const allTopics = courseData.topics;
         let topicIdx = allTopics.findIndex((topicWID) => topicWID?.topic?._id === topic_id);

         const { items, ...restTopic } = updatedTopic;

         allTopics[topicIdx].topic = {
            ...allTopics[topicIdx].topic,
            ...restTopic
         }


         setCourseData(data => {
            return {
               ...data,
               topics: allTopics
            }
         })
         setTopicData({
            title: "",
            description: "",
            items: [],
            preview_available: false
         })
         setShowTopicForm(false)
      } catch (error) {
         console.log(error);
      }
   }

   // add new item in topic : item - quiz
   const addItemInTopic = async () => {
      try {
         let data = {
            item_type: "Quiz",
            quiz: {
               quiz_title: quizData.quiz_title,
               quiz_description: quizData.quiz_description
            }
         }

         const response = await axios.patch(`${API}/topic/add/item/${topicId}`, data, {
            headers: {
               token: localStorage.getItem("token")
            }
         });

         const { item, item_type } = response.data;
         let newItem = {
            item_type,
            item,
            _id: item._id
         }

         // topic index 
         const topicIndex = courseData.topics.findIndex(topicWID => topicWID.topic._id === topicId);

         // Create a new array of items for the topic with the new item added
         const newItems = [...courseData.topics[topicIndex].topic.items, newItem];

         // Create a new array of topics with the new array of items
         const newTopics = [...courseData.topics];
         newTopics[topicIndex].topic = { ...newTopics[topicIndex].topic, items: newItems };

         setCourseData({
            ...courseData,
            topics: newTopics
         })

         setQuizId(item._id);

      } catch (error) {
         console.log(error);
      }
   }

   // update quiz data 
   const updateQuizData = () => {
      try {
         axios.patch(`${API}/quiz/${quizId}`, quizData, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {

                  const allTopics = courseData.topics;

                  const topicIdx = allTopics.findIndex((topicWID) => topicWID.topic._id === topicId);
                  if (topicIdx === -1) return;

                  const items = allTopics[topicIdx].topic.items;
                  const itemIdx = items.findIndex((itemWID) => itemWID.item._id === quizId);

                  if (itemIdx === -1) return;

                  allTopics[topicIdx].topic.items[itemIdx].item = {
                     ...res.data.quiz,
                     questions: allTopics[topicIdx].topic.items[itemIdx].item.questions
                  };

                  setCourseData(data => {
                     return {
                        ...data,
                        topics: allTopics
                     }
                  })
               }

            })
      } catch (error) {
         console.error("Quiz Update Error", error);
      }
   }

   // add quiz to topics: call addItemInTopic() 
   const handleFormSubmitPage1 = () => {
      try {
         if (quizAdded === true) {
            setQuizPage(2);
            return;
         }

         addItemInTopic();
         setQuizAdded(true)
         setQuizPage(2)
      } catch (error) {
         console.log(error);
      }
   }

   // add question in quiz 
   const addNewQuestion = async () => {
      try {
         if (quizId === "" || quizId === undefined) {
            console.log("Quiz id not defined ", quizId);
         }
         const { type, ...restData } = questionData;
         axios.patch(`${API}/quiz/add/question/${quizId}`, restData, {
            headers: {
               token: localStorage.getItem("token")
            }
         }).then((res) => {
            let allQuestions = quizData.questions;
            allQuestions = [...allQuestions, res.data.question];

            setQuizData(data => {
               return {
                  ...data,
                  questions: allQuestions
               }
            })

            let allTopic = courseData.topics;
            const topicIDX = allTopic.findIndex((topicWID) => topicWID.topic._id === topicId);
            let items = allTopic[topicIDX].topic.items;
            const itemIdx = items.findIndex((itemWID) => itemWID.item._id === quizId);

            allTopic[topicIDX].topic.items[itemIdx].item.questions = [
               ...allTopic[topicIDX].topic.items[itemIdx].item.questions,
               res.data.question
            ]

            setCourseData(data => {
               return {
                  ...data,
                  topics: allTopic
               }
            })


         })

      } catch (error) {
         console.log(error);
      }
   }

   // update question data
   const updateQuestionData = () => {
      try {
         if (questionId === "" || questionId === undefined) return;
         axios.patch(`${API}/question/${questionId}`, questionData, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               if (res.data.status === "success") {

                  const allTopics = courseData.topics;

                  const topicIdx = allTopics.findIndex((topicWID) => topicWID.topic._id === topicId);
                  if (topicIdx === -1) return;

                  const allItems = allTopics[topicIdx].topic.items;
                  const itemIdx = allItems.findIndex((item) => item.item._id === quizId);

                  if (itemIdx === -1) return;

                  const questionIdx = allItems[itemIdx].item.questions.findIndex((que) => que._id === questionId);
                  if (questionIdx === -1) return;

                  allTopics[topicIdx].topic.items[itemIdx].item.questions[questionIdx] = res.data.question;
                  let NewQuizData = allTopics[topicIdx].topic.items[itemIdx].item;

                  setQuizData(NewQuizData)

                  setCourseData(data => {
                     return {
                        ...data,
                        topics: allTopics
                     }
                  })
               }
            })
      } catch (error) {
         console.log(error);
      }
   }

   // add assignment in topic 
   const createNewAssignment = async () => {
      try {
         let data = {
            item_type: "Assignment",
            assignment: assignmentData
         }

         axios.patch(`${API}/topic/add/item/${topicId}`, data, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status, item } = res.data;
               if (status === "success") {
                  let allTopic = courseData.topics;
                  const topicIdx = allTopic.findIndex((topicWID) => String(topicWID.topic._id) === String(topicId));
                  if (topicIdx === -1) return;

                  allTopic[topicIdx].topic.items = [...allTopic[topicIdx].topic.items, { _id: item._id, item, item_type: "Assignment" }]

                  setCourseData(prev => ({
                     ...prev,
                     topics: allTopic
                  }))

                  closeAssignmentForm();
               }
            })


      } catch (error) {
         console.warn(error);
      }
   }

   // update assignment data 
   const updateAssignmentData = () => {
      try {
         axios.patch(`${API}/assignment/${assignmentId}`, assignmentData, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {
                  const allTopics = courseData.topics;

                  const topicIdx = allTopics.findIndex((topicWID) => topicWID.topic._id === topicId);
                  if (topicIdx === -1) return;

                  const items = allTopics[topicIdx].topic.items;
                  const itemIdx = items.findIndex((itemWID) => itemWID.item._id === assignmentId);

                  if (itemIdx === -1) return;

                  allTopics[topicIdx].topic.items[itemIdx].item = res.data.assignment;

                  setCourseData(data => {
                     return {
                        ...data,
                        topics: allTopics
                     }
                  })
                  closeAssignmentForm()
               }
            })
      } catch (error) {
         console.warn(error);
      }
   }

   // delete assignment by id
   const deleteAssignmentById = (topic_id, assignment_id) => {
      try {
         axios.delete(`${API}/assignment/${topic_id}/${assignment_id}`, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {
                  let allTopic = courseData.topics;
                  const topicIdx = allTopic.findIndex((topicWID) => String(topicWID?.topic?._id) === String(topic_id));
                  if (topicIdx === -1) return;

                  const itemIdx = allTopic[topicIdx].topic.items.findIndex((itemWID) => itemWID.item._id === assignment_id);
                  if (itemIdx === -1) return;
                  const filteredItem = allTopic[topicIdx].topic.items.filter((itemWID) => itemWID.item._id !== assignment_id);

                  allTopic[topicIdx].topic.items = filteredItem;
                  setCourseData(prev => ({
                     ...prev,
                     topics: allTopic
                  }))
               }
            })

      } catch (error) {
         console.log(error);
      }
   }

   // close assignment form 
   const closeAssignmentForm = () => {
      setShowAssignmentForm(false)
      setAssignmentData({
         course: "",
         title: "",
         description: "",
         unlocking_date: new Date().toISOString(),
         time_limit: 0,
         time_limit_type: "minute",
         total_points: 10,
         passing_point: 5,
         max_uploads: 1,
         max_size: 5,
         assignment_pdf: "",
         preview_available: false
      })
      setAssignmentUpdateData({
         isEditType: false,
      })
   }

   // add question page back & footer page update btn 
   const updateQuestionAndBack = () => {
      updateQuestionData();
      setQuestionId("")
      setQuizPage(2)
   }

   // add new question 
   const addNewQuestionAndBack = () => {
      addNewQuestion()
      setQuizPage(2)
   }

   // close quiz form 
   const closeQuizForm = () => {
      setQuizData({
         quiz_title: "",
         quiz_description: "",
         time_limit: {
            limit: 60,
            limit_type: "minute",
            show_time_limit: false
         },
         feedback_mode: "default",
         passing_mark: 80,
         max_answers: 10,
         advance: {
            auto_start_quiz: false,
            show_question_number: false,
            short_answer_limit: 200,
            essay_limit: 500,
         },
         question_layout: "single_question",
         question_order: "random",
         questions: [],
         preview_available: false
      })
      setQuestionData({
         question_title: "",
         question_description: "",
         point: 1,
         display_point: true,
         options: [
         ],
         ordering: {
            randomize: true,
            orders: [],
            ordering_answer: [],
         },
         matching: {
            option1: [],
            option2: [],
            answer: []
         },
         single_answer: "",
         multi_answer: {
            max_choice: 1,
            answer: []
         },
         image: {
            image_url: "",
            answer: ""
         },
         true_false_answer: true,
         question_type: "true_false",
         answer_required: false,
         randomise: true
      })
      setQuizPage(1);
      setQuizAdded(false);
      setShowQuizForm(false);
   }

   // update quiz data page3: submit
   const updateQuizDataAndClose = () => {
      updateQuizData();
      setQuizPage(1)
      setShowQuizForm(false);
      setQuizAdded(false);
      setQuizData({
         quiz_title: "",
         quiz_description: "",
         time_limit: {
            limit: 60,
            limit_type: "minute",
            show_time_limit: false
         },
         feedback_mode: "default",
         passing_mark: 80,
         max_answers: 10,
         advance: {
            auto_start_quiz: false,
            show_question_number: false,
            short_answer_limit: 200,
            essay_limit: 500,
         },
         question_layout: "single_question",
         question_order: "random",
         questions: []
      })
      setQuestionData({
         question_title: "",
         question_description: "",
         point: 1,
         display_point: true,
         options: [
         ],
         ordering: {
            randomize: true,
            orders: [],
            ordering_answer: [],
         },
         matching: {
            option1: [],
            option2: [],
            answer: []
         },
         single_answer: "",
         multi_answer: {
            max_choice: 1,
            answer: []
         },
         image: {
            image_url: "",
            answer: ""
         },
         true_false_answer: true,
         question_type: "true_false",
         answer_required: false,
         randomise: true
      })
   }


   // const delete topic 
   const deleteTopicById = (topic_id) => {
      try {
         axios.delete(`${API}/topic/${topic_id}`, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {
                  let allTopic = courseData.topics;
                  let filteredTopics = allTopic.filter((topicWID) => String(topicWID.topic._id) !== String(topic_id));
                  setCourseData(prev => ({
                     ...prev,
                     topics: filteredTopics
                  }))
               }
            })
      } catch (error) {
         console.log(error);
      }
   }

   // delete quiz by id 
   const deleteQuizById = (topic_id, quiz_id) => {
      try {
         axios.delete(`${API}/quiz/${topic_id}/${quiz_id}`, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {
                  let allTopic = courseData.topics;
                  const topicIdx = allTopic.findIndex((topicWID) => String(topicWID?.topic?._id) === String(topic_id));
                  if (topicIdx === -1) return;

                  const itemIdx = allTopic[topicIdx].topic.items.findIndex((itemWID) => itemWID.item._id === quiz_id);
                  if (itemIdx === -1) return;
                  const filteredItem = allTopic[topicIdx].topic.items.filter((itemWID) => itemWID.item._id !== quiz_id);

                  allTopic[topicIdx].topic.items = filteredItem;
                  setCourseData(prev => ({
                     ...prev,
                     topics: allTopic
                  }))
               }
            })

      } catch (error) {
         console.log(error);
      }
   }

   // lesson methods

   // add new lesson in topics
   const addNewLesson = () => {
      try {
         let data = {
            item_type: "Lesson",
            lesson: lessonData
         }

         axios.patch(`${API}/topic/add/item/${topicId}`, data, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status, item } = res.data;
               if (status === "success") {

                  let allTopic = courseData.topics;
                  const topicIdx = allTopic.findIndex((topicWID) => String(topicWID.topic._id) === String(topicId));

                  if (topicIdx === -1) return;

                  allTopic[topicIdx].topic.items = [...allTopic[topicIdx].topic.items, { _id: item._id, item, item_type: "Lesson" }]

                  setCourseData(prev => ({
                     ...prev,
                     topics: allTopic
                  }))

                  closeLessonForm();
               }
            })


      } catch (error) {
         console.warn(error);
      }
   }

   // update lesson by id 
   const updateLessonById = () => {
      try {
         axios.patch(`${API}/lesson/update/${lessonId}`, lessonData, {
            headers: {
               token: localStorage.getItem("token")
            }
         })
            .then((res) => {
               const { status } = res.data;
               if (status === "success") {
                  const allTopics = courseData.topics;

                  const topicIdx = allTopics.findIndex((topicWID) => topicWID.topic._id === topicId);
                  if (topicIdx === -1) return;

                  const items = allTopics[topicIdx].topic.items;
                  const itemIdx = items.findIndex((itemWID) => itemWID.item._id === lessonId);

                  if (itemIdx === -1) return;

                  allTopics[topicIdx].topic.items[itemIdx].item = res.data?.lesson;

                  setCourseData(data => {
                     return {
                        ...data,
                        topics: allTopics
                     }
                  })
                  closeLessonForm()
               }
            })
      } catch (error) {
         console.warn(error);
      }
   }


   // close lesson form and reset lesson data and update data
   const closeLessonForm = () => {
      setShowLessonForm(false);
      setLessonData({
         title: "",
         lesson_content: "",
         featured_image: "",
         video_source: "",
         video_source_type: "none",
         video_playback_time: {
            hour: 0,
            minute: 0,
            second: 0
         },
         attachments: [],
         preview_available: false
      });
      setLessonUpdateData({
         isEditType: false
      })
   }

   // close recording form and reset data 
   const closeRecordingForm = () => {
      setShowRecordingForm(false)
      setRecordingUpdateData({
         isEditType: false
      })
      setRecordingData({
         attachments: [],
         course: "",
         description: "",
         title: "",
         video_source: "",
         video_source_title: "",
         video_source_type: ""
      })
   }

   return (
      <newCourseCtx.Provider value={{
         // course 
         courseData, setCourseData,
         updateCourseData,
         // quiz 
         showQuizForm, setShowQuizForm,
         quizId, setQuizId,
         quizPage, setQuizPage,
         deleteQuizById,
         quizData, setQuizData,
         questionData, setQuestionData,
         quizUpdateData, setQuizUpdateData,
         questionId, setQuestionId,
         addNewQuestion,
         updateQuestionData,
         updateQuizData,
         updateQuestionAndBack,
         addNewQuestionAndBack,
         handleFormSubmitPage1,
         closeQuizForm,
         updateQuizDataAndClose,
         // topic 
         showTopicForm, setShowTopicForm,
         topicId, setTopicId,
         addItemInTopic,
         createNewTopic,
         topicData, setTopicData,
         topicUpdateData, setTopicUpdateData,
         updateTopicById,
         deleteTopicById,
         // assignment data 
         showAssignmentForm, setShowAssignmentForm,
         assignmentData, setAssignmentData,
         createNewAssignment,
         assignmentUpdateData, setAssignmentUpdateData,
         assignmentId, setAssignmentId,
         closeAssignmentForm,
         updateAssignmentData,
         deleteAssignmentById,
         // lesson data
         showLessonForm, setShowLessonForm,
         lessonData, setLessonData,
         lessonUpdateData, setLessonUpdateData,
         addNewLesson,
         lessonId, setLessonId,
         updateLessonById,
         closeLessonForm,
         // recording 
         showRecordingForm, setShowRecordingForm,
         recordingData, setRecordingData,
         allRecordings, setAllRecordings,
         closeRecordingForm,
         recordingUpdateData
      }}>
         {children}
      </newCourseCtx.Provider>
   )
}

export default CourseBuilderProvider