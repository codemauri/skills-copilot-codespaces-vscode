function skillsMember() {
    var member = {
        name: 'John Doe',
        skills: ['JavaScript', 'CSS', 'HTML'],
        age: 25,
        isMember: true,
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(skill);
            });
        }
    };
    return member;
}