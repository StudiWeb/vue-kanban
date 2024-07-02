import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const PROJECT_MANAGER_ROLE = 'projectManager'
const TEAM_LEADER_ROLE = 'teamLeader'
const PENDING_TIME = 1500

export const useTeamsStore = defineStore('teams', () => {
    const teams = ref([
        {
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
    ])
    
    const pending = ref(false)

    function addTeam(team) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
               try {
                    teams.value.push({
                        id: uuidv4(),
                        ...team
                    })
                    resolve(`${team.name} has been added to team list successfully.`)
               } catch(e) {
                    reject('During adding a new team an error occurred.')
               } finally {
                pending.value = false
               }
           },PENDING_TIME)
        })
    }

    function editTeam(team) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    const teamIndexToEdit = teams.value.findIndex((t) => t.id === team.id)
                    teams.value[teamIndexToEdit] = team
                    resolve(`Team ${team.name} has been edited successfully.`)
                } catch(error) {
                    reject('During editing the team an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function deleteTeam(teamId) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    const team = teams.value.find((t) => t.id === teamId)
                    const teamIndexToDelete = teams.value.findIndex((t) => t.id === teamId)
                    teams.value.splice(teamIndexToDelete,1)
                    resolve(`${team.name} has been deleted from the team list successfully.`)
                } catch(error) {
                    reject('During deleting the team an error occurred.')
                } finally {
                    pending.value = false
                }

            },PENDING_TIME)
        })
    }

    return { teams ,pending, addTeam,editTeam ,deleteTeam }
})