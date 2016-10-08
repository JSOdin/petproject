var _= require('lodash');
var Cat = require('../models/cat.js');

module.exports=function(app){

    /* create */
    app.post('/cat',function(req,res){
        var newCat = new Cat(req.body);
        newCat.save(function(err){
            if (err){
                res.json({info:'error during cat create', error:err});
            }
            res.json({info:'cat created successfully'});
        })
    });

    /* read */
    app.get('/cat',function(req,res){
        Cat.find(function(err,cats){
            if (err){
                res.json({info: 'error during find cats', error:err});
            }
            res.send(cats);
        })
    }) ;

    app.get('/cats/:id',function(req,res){
        Cat.findById(req.params.id, function(err,cat){
            if (err){
                res.json({info: 'error during find cat', error:err});
            }
            if (cat){
                res.json({info:'cat found successfully', data:cat});
            } else {
                res.json({info:'cat not found'});
            }
        })
    });

    /* Update */

    app.put('/cat/:id',function(req,res){
       Cat.findById(req.params.id, function(err,cat){
           if (err){
               res.json({info:'error during find cat', error:err});
           }

           if (cat){
               _.merge(cat, req.body);
               cat.save(function(err){
                   if (err){
                       res.json({info:'error during cat update', error:err});
                   }
                   res.json({info:'cat updated successfully'});
               })
           } else {
               res.json({info:'cat not found'});
           }
       })
    });

    /* Delete */

    app.delete('/cat/:id',function(req,res) {
        Cat.findById(req.params.id).remove(function(err){
            if (err){
                res.json({info:'error during cat removal', error:err});
            }
            res.json({info:'cat removed successfully'});
        })

    });
};