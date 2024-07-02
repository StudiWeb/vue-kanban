export default (supervisor,availableTeamMembers,selectedTeamMembers) => {
    if(supervisor) {
        availableTeamMembers.forEach(member => {
            if(member.id === supervisor.id) {
                removeSupervisorFromAvailableList(supervisor,availableTeamMembers)
                addSupervisorToSelectedList(supervisor,selectedTeamMembers)
            }
        });
    }
}

function removeSupervisorFromAvailableList(supervisor,list) {
    const index = list.findIndex(member => member.id === supervisor.id)
    list.splice(index,1)
}

function addSupervisorToSelectedList(supervisor,list) {
    list.unshift(supervisor)
}