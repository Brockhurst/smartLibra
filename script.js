
var UM = {
    run: function () {
        this.addview = new this.addView();
        this.listview = new this.listView();
        this.userscollection = new UM.usersCollection();
        this.router = new this.Router();
        Backbone.history.start();
        this.router.navigate('list_users', {trigger: true});
    }
};

UM.Router = Backbone.Router.extend({
    routes: {
        'list_users': 	 'renderListUsersPage',
        'add_new_user':  'renderAddNewUserPage',
        'edit_user/:id': 'renderEditUserPage'
    }, 

    renderAddNewUserPage: function () {
        UM.addview.addUserPage();
    }, 

    renderListUsersPage: function () {
        UM.listview.setElement('div.panel');
        UM.listview.listUsersPage();
    },

    renderEditUserPage: function (id) {
        UM.addview.addUserPage(id);
    }
});

UM.userModel = Backbone.Model.extend({
    sync: function (method, model, options) {
        if (method === 'create' || method === 'update') {
            return $.ajax({
                dataType: 'json',
                method: 'POST',
                url: 'http://jsonplaceholder.typicode.com/users',
                data: {
                    id: (this.get('id') || ''), 
                    full_name: (this.get('full_name') || ''), 
                    email: (this.get('email') || ''),
                    phone: (this.get('phone') || ''), 
                    address: (this.get('address') || '')
                }, 
                success: function (data) {					
                    console.log('succesfully created user');
                }
            });
        } else if (method === 'delete') {
            var id = this.get('id');
            $.ajax('http://jsonplaceholder.typicode.com/posts/' + id, {
                method: 'DELETE',
                success: function () {
                    $('#usersGrid tr[data-id="' + id + '"]').hide('slow');
                    console.log('succesfully deleted user');
                }
            });
        }
    }
});

UM.usersCollection = Backbone.Collection.extend({
    model: UM.userModel,
    url: 'http://jsonplaceholder.typicode.com/users'
});

/* addNewUser View */
UM.addView = Backbone.View.extend({
    el: 'div.panel',

    template: _.template($('#addUserTemplate').html()),

    events: {
        'submit form#frmAddUser': 'addUser'
    }, 

    initialize: function () {
        _.bindAll(this, 'addUserPage', 'addUser');
    }, 

    addUserPage: function (id) {
        var user = {},
        model = UM.userscollection.get(id);

        if (id !== undefined && model !== undefined) {
            user = model.toJSON();
        }
        this.$el.html(this.template({user: user}));
    },

    addUser: function (event) {
        var full_name = $('#full_name').val(),
            email = $('#email').val(), 
            phone = $('#phone').val(), 
            address = $('#address').val(), 
            id = $('#id').val();

        if (id === '') {
            var usermodel = new UM.userModel({
                full_name: full_name, 
                email: email, 
                phone: phone, 
                address: address
            });
        } else {
            var usermodel = new UM.userModel({
                id: id, 
                full_name: full_name, 
                email: email, 
                phone: phone, 
                address: address
            });	
        }
        usermodel.save();
        return false;
    }
});

/* listUsers View */
UM.listView = Backbone.View.extend({
    el: 'div.panel',

    template: _.template($('#listUsersTemplate').html()),

    initialize: function () {
        _.bindAll(this, 'listUsersPage', 'render');
    }, 

    render: function (response) {
        var self = this;

        this.$el.html(this.template({users: response}));
        $('#usersGrid tr[data-id]').each(function () {
            $('#userGrid tr[data-id]').each(function () {
                var id = $(this).attr('data-id');
                $(this).find('a:first').click(function (e) {
                    e.preventDefault();
                    debugger;
                    self.editUser(id);
                });
                $(this).find('a:last').click(function (e) {
                    e.preventDefault();
                    debugger;
                    self.deleteUser(id);
                });
            });
        });
    },

    listUsersPage: function (querystring) {
        var self = this;

        UM.userscollection.fetch({
            data: querystring, 
            success: function (collection, response) {
                self.render(response);
            }
        });
    }, 

    deleteUser: function (id) {
        if (confirm('Are you sure to delete?')) {
            UM.userscollection.get(id).destroy();
        }		
    }, 

    editUser: function (id) {
        UM.router.navigate('edit_user/' + id, {trigger: true});
    }
});

$(function () {
    UM.run();
});
