import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const PROJECT_MANAGER_ROLE = 'projectManager'
const TEAM_LEADER_ROLE = 'teamLeader'
const PENDING_TIME = 1500

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref([
        {
            id: 'p1',
            name: "Market Master",
            projectManager: {
                id: "e1",
                firstName: "Todd",
                lastName: "Ross",
                jobPosition: "Frontend Developer",
                phone: "(851) 794-4722",
                email: "todd.ross@example.com",
                roles: [PROJECT_MANAGER_ROLE,TEAM_LEADER_ROLE]
            },
            team: {
                id: "t1",
                name: 'Rocket Team',
                teamLeader: {               
                    id: "e2",
                    firstName: "Glen",
                    lastName: "Carter",
                    jobPosition: "Backend Developer",
                    phone: "(593) 337-8976",
                    email: "glen.carter@example.com",
                    roles: [TEAM_LEADER_ROLE]
                },
                teamMembers: [
                    {
                        id: "e1",
                        firstName: "Todd",
                        lastName: "Ross",
                        jobPosition: "Frontend Developer",
                        phone: "(851) 794-4722",
                        email: "todd.ross@example.com",
                        roles: [PROJECT_MANAGER_ROLE,TEAM_LEADER_ROLE]
                    },
                    {               
                        id: "e2",
                        firstName: "Glen",
                        lastName: "Carter",
                        jobPosition: "Backend Developer",
                        phone: "(593) 337-8976",
                        email: "glen.carter@example.com",
                        roles: [TEAM_LEADER_ROLE]
                    }
                ]
            }
        },
        {
            id: 'p2 ',
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
                    }
                ]
            }
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

    return { projects ,pending, addProject,editProject ,deleteProject }
})