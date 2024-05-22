import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const PENDING_TIME = 1500

export const useEmployeesStore = defineStore('employees', () => {
    const employees = ref([
        {
            id: "e1",
            createdAt: "",
            firstName: "Michał",
            lastName: "Stodolny",
            jobPosition: "Frontend Developer",
            phone: "(432) 333-1234",
            email: "michal@stodolny.com"
        },
        {
            id: "e2",
            createdAt: "",
            firstName: "Łukasz",
            lastName: "Nowakowski",
            jobPosition: "Backend Developer",
            phone: "(343) 343-1234",
            email: "lukasz@nowakowski.com"
        }
    ])
    
    const pending = ref(false)

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
                    resolve(`${employee.firstName} ${employee.lastName} has been added to employee list successfully.`)
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
                    resolve(`${employee.firstName} ${employee.lastName} has been delted from employee list successfully.`)
                } catch(error) {
                    reject('During deleting an employee an error occurred.')
                } finally {
                    pending.value = false
                }

            },PENDING_TIME)
        })
    }

    return { employees,pending, addEmployee, editEmployee, deleteEmployee }
})