import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const PROJECT_MANAGER_ROLE = 'projectManager'
const TEAM_LEADER_ROLE = 'teamLeader'
const TASK_BACKLOG = 'backlog'
const TASK_DOING = 'doing'
const TASK_REVIEW = 'review'
const TASK_DONE = 'done'
const PENDING_TIME = 1500

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref([
        {
            id: 'p1',
            name: "Urban Link",
            projectManager: {
                id: "e5",
                firstName: "Nicole",
                lastName: "Hanson",
                jobPosition: "DevOps Engineer",
                phone: "(726) 667-1891",
                email: "nicole.hanson@example.com",
                roles: [PROJECT_MANAGER_ROLE],
                photo: 'https://randomuser.me/api/portraits/women/8.jpg'
            },
            team: {
                id: "t1",
                name: 'Rocket Team',
                teamLeader: {
                    id: "e1",
                    firstName: "Todd",
                    lastName: "Ross",
                    jobPosition: "Frontend Developer",
                    phone: "(851) 794-4722",
                    email: "todd.ross@example.com",
                    roles: [PROJECT_MANAGER_ROLE,TEAM_LEADER_ROLE],
                    photo: 'https://randomuser.me/api/portraits/men/29.jpg'
                },
                teamMembers: [
                    {
                        id: "e3",
                        firstName: "Bradley",
                        lastName: "Ramirez",
                        jobPosition: "Fullstack Developer",
                        phone: "(895) 726-5639",
                        email: "bradley.ramirez@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/51.jpg'
                    },
                    {
                        id: "e5",
                        firstName: "Nicole",
                        lastName: "Hanson",
                        jobPosition: "DevOps Engineer",
                        phone: "(726) 667-1891",
                        email: "nicole.hanson@example.com",
                        roles: [PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/8.jpg'
                    },
                    {
                        id: "e6",
                        firstName: "Roland",
                        lastName: "Holland",
                        jobPosition: "Flutter Developer",
                        phone: "(236) 405-4677",
                        email: "roland.holland@example.com",
                        roles: [TEAM_LEADER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/men/57.jpg'
                    },
                    {
                        id: "e7",
                        firstName: "Ron",
                        lastName: "Snyder",
                        jobPosition: "Senior C++ Engineer",
                        phone: "(733) 301-0725",
                        email: "ron.snyder@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/82.jpg'
                    },
                    {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/61.jpg'
                    }
                ]
            },
            tasks: [
                {
                    id: 'p1t1',
                    name: 'Research existing city information platforms',
                    description: 'Analyze existing platforms to understand best practices, functionalities, and potential areas for improvement in Urban Link.',
                    employee: {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/61.jpg'
                    },
                    status: TASK_BACKLOG
                },
                {
                    id: 'p1t2',
                    name: 'Define target user groups and their needs',
                    description: 'Identify different user groups (citizens, businesses, tourists) and research their specific needs for accessing city information and services.',
                    employee: {
                        id: "e7",
                        firstName: "Ron",
                        lastName: "Snyder",
                        jobPosition: "Senior C++ Engineer",
                        phone: "(733) 301-0725",
                        email: "ron.snyder@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/82.jpg'
                    },
                    status: TASK_DOING
                },
                {
                    id: 'p1t3',
                    name: 'Identify data sources for city services and information',
                    description: 'Locate and establish connections with relevant city departments and databases to collect accurate and up-to-date information.',
                    employee: {
                        id: "e5",
                        firstName: "Nicole",
                        lastName: "Hanson",
                        jobPosition: "DevOps Engineer",
                        phone: "(726) 667-1891",
                        email: "nicole.hanson@example.com",
                        roles: [PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/8.jpg'
                    },
                    status: TASK_DOING
                },
                {
                    id: 'p1t4',
                    name: 'Design a user-friendly interface for accessing city information',
                    description: 'Create a website or mobile app with an intuitive interface that allows users to easily find what they need.',
                    employee: {
                        id: "e3",
                        firstName: "Bradley",
                        lastName: "Ramirez",
                        jobPosition: "Fullstack Developer",
                        phone: "(895) 726-5639",
                        email: "bradley.ramirez@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/51.jpg'
                    },
                    status: TASK_DONE
                },
                {
                    id: 'p1t5',
                    name: 'Develop functionalities for searching services, paying fees, submitting requests, etc.',
                    description: 'Implement features that enable users to interact with city services online, such as searching for public transportation schedules, paying parking tickets, or submitting service requests.',
                    employee: {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/61.jpg'
                    },
                    status: TASK_REVIEW
                },
                {
                    id: 'p1t6',
                    name: 'Integrate with existing city databases and systems',
                    description: 'Connect the platform with existing city data sources to ensure information accuracy and streamline data flow.',
                    employee: {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/women/61.jpg'
                    },
                    status: TASK_DONE
                },
                {
                    id: 'p1t7',
                    name: 'Launch the platform in phases (e.g., pilot testing, public rollout)',
                    description: 'Conduct a pilot test with a limited user group to gather feedback and refine the platform before a wider public launch.',
                    employee: {
                        id: "e7",
                        firstName: "Ron",
                        lastName: "Snyder",
                        jobPosition: "Senior C++ Engineer",
                        phone: "(733) 301-0725",
                        email: "ron.snyder@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/82.jpg'
                    },
                    status: TASK_REVIEW
                },
                {
                    id: 'p1t8',
                    name: 'Develop user onboarding materials and training programs',
                    description: 'Create clear instructions, tutorials, and training sessions to help users navigate and utilize the Urban Link platform effectively.',
                    employee: {
                        id: "e3",
                        firstName: "Bradley",
                        lastName: "Ramirez",
                        jobPosition: "Fullstack Developer",
                        phone: "(895) 726-5639",
                        email: "bradley.ramirez@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/51.jpg'
                    },
                    status: TASK_BACKLOG
                },
                {
                    id: 'p1t9',
                    name: 'Market the platform to city residents',
                    description: ' Promote the launch of Urban Link through various channels (e.g., social media, city website, local news) to raise awareness and encourage citizen adoption.',
                    employee: {
                        id: "e7",
                        firstName: "Ron",
                        lastName: "Snyder",
                        jobPosition: "Senior C++ Engineer",
                        phone: "(733) 301-0725",
                        email: "ron.snyder@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/82.jpg'
                    },
                    status: TASK_BACKLOG
                },
                {
                    id: 'p1t10',
                    name: 'Track platform usage and user feedback',
                    description: 'Monitor user activity on the platform and collect feedback through surveys or support channels to identify areas for improvement.',
                    employee: {
                        id: "e3",
                        firstName: "Bradley",
                        lastName: "Ramirez",
                        jobPosition: "Fullstack Developer",
                        phone: "(895) 726-5639",
                        email: "bradley.ramirez@example.com",
                        roles: [],
                        photo: 'https://randomuser.me/api/portraits/men/51.jpg'
                    },
                    status: TASK_REVIEW
                },
                {
                    id: 'p1t11',
                    name: 'Address technical issues and bugs',
                    description: 'Proactively identify and resolve any technical problems that may arise to ensure smooth platform operation.',
                    employee: {
                        id: "e6",
                        firstName: "Roland",
                        lastName: "Holland",
                        jobPosition: "Flutter Developer",
                        phone: "(236) 405-4677",
                        email: "roland.holland@example.com",
                        roles: [TEAM_LEADER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/men/57.jpg'
                    },
                    status: TASK_DOING
                },
                {
                    id: 'p1t12',
                    name: 'Implement new features and updates based on user needs',
                    description: 'Continuously develop new functionalities and updates based on user feedback and evolving city information requirements.',
                    employee: {
                        id: "e6",
                        firstName: "Roland",
                        lastName: "Holland",
                        jobPosition: "Flutter Developer",
                        phone: "(236) 405-4677",
                        email: "roland.holland@example.com",
                        roles: [TEAM_LEADER_ROLE],
                        photo: 'https://randomuser.me/api/portraits/men/57.jpg'
                    },
                    status: TASK_BACKLOG
                }
            ]
        },
    ])
    
    const pending = ref(false)

    function addProject(project) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
               try {
                    projects.value.push({
                        id: uuidv4(),
                        ...project
                    })
                    resolve(`Project ${project.name} has been added to project list successfully.`)
               } catch(e) {
                    reject('During adding new project an error occurred.')
               } finally {
                pending.value = false
               }
           },PENDING_TIME)
        })
    }

    function editProject(project) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    console.log(project.id)
                    const projectIndexToEdit = projects.value.findIndex((p) => p.id === project.id)
                    projects.value[projectIndexToEdit] = project
                    resolve(`Project ${project.name} has been edited successfully.`)
                } catch(error) {
                    reject('During editing the project an error occurred.')
                    throw(error)
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function deleteProject(projectId) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find((t) => t.id === projectId)
                    const projectIndexToDelete = projects.value.findIndex((p) => p.id === projectId)
                    projects.value.splice(projectIndexToDelete,1)
                    resolve(`Project ${project.name} has been deleted from the team list successfully.`)
                } catch(error) {
                    reject('During deleting the team an error occurred.')
                } finally {
                    pending.value = false
                }

            },PENDING_TIME)
        })
    }

    function getProject(projectId) {
        return projects.value.find(p => p.id === projectId)
    }

    function getTasks(projectId) {
        const project = projects.value.find(p => p.id === projectId)
        return project.tasks
    }

    function getEmployees(projectId) {
        const project = projects.value.find(p => p.id === projectId)
        return project.team.teamMembers
    }

    function addTask(projectId, task) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    project.tasks.push(task)
                    resolve(`${task.name} has been added to the task list successfully.`)
                } catch(error) {
                    reject('During adding the task an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function editTask(projectId, taskId, editedTask) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    const taskIndexToEdit = project.tasks.findIndex(t => t.id === taskId)
                    project.tasks[taskIndexToEdit] = editedTask
                    resolve(`Task has been edited successfully.`)
                } catch(error) {
                    reject('During editing the task an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function deleteTask(projectId, taskId) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    const taskIndexToDelete = project.tasks.findIndex(t => t.id === taskId)
                    project.tasks.splice(taskIndexToDelete,1)
                    resolve(`Task has been deleted successfully.`)
                } catch(error) {
                    reject('During deleting the task an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function editEmployee(projectId,taskId,employee) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    const task = project.tasks.find(t => t.id === taskId)
                    task.employee = employee
                    resolve(`Employee has been edited successfully.`)
                } catch(error) {
                    reject('During editing the employee an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function editDescription(projectId,taskId,description) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    const task = project.tasks.find(t => t.id === taskId)
                    task.description = description
                    resolve(`Description has been edited successfully.`)
                } catch(error) {
                    reject('During editing the description an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function editStatus(projectId,taskId,status) {
        pending.value = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const project = projects.value.find(p => p.id === projectId)
                    const task = project.tasks.find(t => t.id === taskId)
                    task.status = status
                    resolve(`Status has been edited successfully.`)
                } catch(error) {
                    reject('During editing the status an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    return { 
        projects,
        pending, 
        addProject,
        editProject,
        deleteProject, 
        getProject, 
        getTasks,
        getEmployees,
        addTask,
        editTask,
        deleteTask,
        editEmployee,
        editDescription,
        editStatus 
    }
})