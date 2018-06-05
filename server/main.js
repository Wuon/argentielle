import '../imports/api/txns.js';

Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({
        service: 'google'
    })

    ServiceConfiguration.configurations.insert(
      { 
          service: 'google',
          clientId: '41488952052-59tqgrj643bvhe1i7rp582n57ekcfdke.apps.googleusercontent.com',
          loginStyle: 'redirect',
          secret: 'MWceG5svLgzlw7ek8dhuUMYo'
      }
    );
  });