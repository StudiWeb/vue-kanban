import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const PROJECT_MANAGER_ROLE = 'projectManager'
const TEAM_LEADER_ROLE = 'teamLeader'
const PENDING_TIME = 1500

export const useEmployeesStore = defineStore('employees', () => {
    const employees = ref([
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
        },
        {
            id: "e3",
            firstName: "Bradley",
            lastName: "Ramirez",
            jobPosition: "Fullstack Developer",
            phone: "(895) 726-5639",
            email: "bradley.ramirez@example.com",
            roles: []
        },
        {
            id: "e4",
            firstName: "Laurie",
            lastName: "Kelly",
            jobPosition: "UI/UX Designer",
            phone: "(895) 726-5639",
            email: "laurie.kelly@example.com",
            roles: []
        },
    ])
    
    const pending = ref(false)

    const projectManagers = computed(() => {
        return employees.value.filter((e) => e.roles.includes(PROJECT_MANAGER_ROLE))
    })

    const teamLeaders = computed(() => {
        return employees.value.filter((e) => e.roles.includes(TEAM_LEADER_ROLE))
    })

    function isProjectManager (employee) {
        return employee.roles.includes(PROJECT_MANAGER_ROLE)
    }

    function isTeamLeader (employee) {
        return employee.roles.includes(TEAM_LEADER_ROLE)
    }

    function addEmployee(employee) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
               try {
                    employees.value.push({
                        id: uuidv4(),
                        ...employee
                    })
                    resolve(`${employee.firstName} ${employee.lastName} has been added to employee list successfully.`)
               } catch(e) {
                    reject('During adding a new employee an error occurred.')
               } finally {
                pending.value = false
               }
           },PENDING_TIME)
        })
    }

    function editEmployee(employee) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    const employeeIndexToEdit = employees.value.findIndex((e) => e.id === employee.id)
                    employees.value[employeeIndexToEdit] = employee
                    resolve(`${employee.firstName} ${employee.lastName} has been edited successfully.`)
                } catch(error) {
                    reject('During editing an employee an error occurred.')
                } finally {
                    pending.value = false
                }
            },PENDING_TIME)
        })
    }

    function deleteEmployee(employeeId) {
        pending.value = true
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try {
                    const employee = employees.value.find((e) => e.id === employeeId)
                    const employeIndexToDelete = employees.value.findIndex((e) => e.id === employeeId)
                    employees.value.splice(employeIndexToDelete,1)
                    resolve(`${employee.firstName} ${employee.lastName} has been deleted from employee list successfully.`)
                } catch(error) {
                    reject('During deleting an employee an error occurred.')
                } finally {
                    pending.value = false
                }

            },PENDING_TIME)
        })
    }

    return { employees,pending,projectManagers, teamLeaders,isProjectManager,isTeamLeader, addEmployee, editEmployee, deleteEmployee }
})