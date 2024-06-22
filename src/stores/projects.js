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
                id: "e4",
                firstName: "Laurie",
                lastName: "Kelly",
                jobPosition: "UI/UX Designer",
                phone: "(895) 726-5639",
                email: "laurie.kelly@example.com",
                roles: [PROJECT_MANAGER_ROLE]
            },
            team: {
                id: "t2",
                name: 'The Dream Team',
                teamLeader: {               
                    id: "e9",
                    firstName: "Christina",
                    lastName: "Beck",
                    jobPosition: "Python Developer",
                    phone: "(352) 869-1115",
                    email: "christina.beck@example.com",
                    roles: [TEAM_LEADER_ROLE]
                },
                teamMembers: [
                    {
                        id: "e9",
                        firstName: "Christina",
                        lastName: "Beck",
                        jobPosition: "Python Developer",
                        phone: "(352) 869-1115",
                        email: "christina.beck@example.com",
                        roles: [TEAM_LEADER_ROLE]
                    },
                    {               
                        id: "e7",
                        firstName: "Ron",
                        lastName: "Snyder",
                        jobPosition: "Senior C++ Engineer",
                        phone: "(733) 301-0725",
                        email: "ron.snyder@example.com",
                        roles: []
                    },
                    {
                        id: "e5",
                        firstName: "Nicole",
                        lastName: "Hanson",
                        jobPosition: "DevOps Engineer",
                        phone: "(726) 667-1891",
                        email: "nicole.hanson@example.com",
                        roles: [PROJECT_MANAGER_ROLE]
                    },
                    {
                        id: "e4",
                        firstName: "Laurie",
                        lastName: "Kelly",
                        jobPosition: "UI/UX Designer",
                        phone: "(895) 726-5639",
                        email: "laurie.kelly@example.com",
                        roles: [PROJECT_MANAGER_ROLE]
                    },
                    {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE]
                    }
                ]
            },
            tasks: [
                {
                    id: 'p1t1',
                    name: 'Infrastructure Mapping',
                    description: ' Identify and document the existing IT infrastructure of urban areas, including networks, servers, and hardware configurations, to assess integration requirements.',
                    employee: {
                        id: "e5",
                        firstName: "Nicole",
                        lastName: "Hanson",
                        jobPosition: "DevOps Engineer",
                        phone: "(726) 667-1891",
                        email: "nicole.hanson@example.com",
                        roles: [PROJECT_MANAGER_ROLE]
                    },
                    status: TASK_DOING,
                },
                {
                    id: 'p1t2',
                    name: 'Database Integration',
                    description: 'Integrate diverse data sources from urban services and utilities into a unified database system, ensuring seamless access and efficient data management.',
                    employee: {
                        id: "e10",
                        firstName: "Rhonda",
                        lastName: "Kennedy",
                        jobPosition: "Data Engineer",
                        phone: "(402) 207-8156",
                        email: "rhonda.kennedy@example.com",
                        roles: [TEAM_LEADER_ROLE,PROJECT_MANAGER_ROLE]
                    },
                    status: TASK_BACKLOG,
                },
                {
                    id: 'p1t3',
                    name: 'User Interface Design',
                    description: 'Develop intuitive and user-friendly interfaces for urban residents and administrators to access and interact with the Urban Link platform effectively.',
                    employee: {
                        id: "e4",
                        firstName: "Laurie",
                        lastName: "Kelly",
                        jobPosition: "UI/UX Designer",
                        phone: "(895) 726-5639",
                        email: "laurie.kelly@example.com",
                        roles: [PROJECT_MANAGER_ROLE]
                    },
                    status: TASK_DOING,
                },
                {
                    id: 'p1t4',
                    name: 'Backend Development',
                    description: 'Build robust backend systems and APIs that handle data processing, analytics, and integration tasks to support the functionalities of Urban Link.',
                    employee: {
                        id: "e9",
                        firstName: "Christina",
                        lastName: "Beck",
                        jobPosition: "Python Developer",
                        phone: "(352) 869-1115",
                        email: "christina.beck@example.com",
                        roles: [TEAM_LEADER_ROLE]
                    },
                    status: TASK_BACKLOG,
                },
                {
                    id: 'p1t5',
                    name: 'Network Security Audit',
                    description: 'Conduct thorough security assessments and audits to identify vulnerabilities in the Urban Link network infrastructure and implement necessary safeguards.',
                    employee: null,
                    status: TASK_BACKLOG,
                },
                {
                    id: 'p1t6',
                    name: 'API Integration',
                    description: 'Migrate existing urban data and records to the Urban Link platform while ensuring data integrity, accuracy, and compliance with data protection regulations.',
                    employee: null,
                    status: TASK_DONE,
                },
                {
                    id: 'p1t7',
                    name: 'Data Migration',
                    description: 'Migrate existing urban data and records to the Urban Link platform while ensuring data integrity, accuracy, and compliance with data protection regulations.',
                    employee: null,
                    status: TASK_BACKLOG,
                },
                {
                    id: 'p1t8',
                    name: 'Performance Testing',
                    description: 'Perform rigorous performance tests to evaluate the responsiveness, scalability, and reliability of Urban Link systems under various conditions and loads.',
                    employee: null,
                    status: TASK_DONE,
                },
                {
                    id: 'p1t9',
                    name: 'Mobile App Development',
                    description: 'Develop mobile applications compatible with iOS and Android platforms to extend the accessibility of Urban Link services to residents on-the-go.',
                    employee: null,
                    status: TASK_BACKLOG,
                },
                {
                    id: 'p1t10',
                    name: 'Cloud Deployment Strategy',
                    description: 'Plan and implement a scalable cloud infrastructure strategy for Urban Link to ensure high availability, reliability, and cost-effectiveness of the platform.',
                    employee: {
                        id: "e5",
                        firstName: "Nicole",
                        lastName: "Hanson",
                        jobPosition: "DevOps Engineer",
                        phone: "(726) 667-1891",
                        email: "nicole.hanson@example.com",
                        roles: [PROJECT_MANAGER_ROLE]
                    },
                    status: TASK_REVIEW,
                },
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
        editDescription 
    }
})