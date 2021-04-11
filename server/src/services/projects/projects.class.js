const { Service } = require('feathers-mongodb');

exports.Projects = class Projects extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('projects');
    });
  }
};
