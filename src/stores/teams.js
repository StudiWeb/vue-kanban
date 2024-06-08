import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import EditTeam from '../components/teams/EditTeam.vue';

const PROJECT_MANAGER_ROLE = 'projectManager'
const TEAM_LEADER_ROLE = 'teamLeader'
const PENDING_TIME = 1500

export const useTeamsStore = defineStore('teams', () => {
    const teams = ref([
        {
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
        },
    ])
    
    const pending = ref(false)

    function addTeam(team) {
        console.log(team)
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