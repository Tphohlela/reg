describe('registration function', function () {
    describe('empty input', function () {
        it('should return "please enter valid registration number"', function () {


            let reg1 = registration();


            assert.equal("Please enter valid registration number", reg1.errors());
        });

    });
    describe('number plate length', function () {


        it('should return nothing if number plate is less than 4 characters', function () {


            let reg1 = registration();


            assert.equal(null, reg1.regList("CA1"));

        });
        it('should return nothing if number plate is less than 4 characters', function () {


            let reg1 = registration();


            assert.equal(null, reg1.regList("CA"));

        });
        it('should return nothing if number plate is more than 9 characters', function () {


            let reg1 = registration();


            assert.equal(null, reg1.regList("CK123456789"));

        });
        it('should also return "Please enter valid registration number" if number plate is less than 4 characters', function () {


            let reg1 = registration();


            assert.equal("Please enter valid registration number", reg1.errors("M2"));

        });
    });



        describe('uppercase', function () {
            it('should make all letters uppercase', function () {

                let reg1 = registration();


                assert.equal("CA123123", reg1.regList("ca123123"));
            });

            it('should make all letters uppercase', function () {

                let reg1 = registration();


                assert.equal("CJ123123", reg1.regList("Cj123123"));
            });
        });

        describe('CA/CJ/CK number plates', function () {

            it('should return number plate because it starts with CJ', function () {

                let reg1 = registration();


                assert.equal("CJ123123", reg1.regList("CJ123123"));
            });

            it('should return number plate because it starts with CA', function () {

                let reg1 = registration();


                assert.equal("CA123123", reg1.regList("CA123123"));
            });
            it('should return number plate because it starts with CK', function () {

                let reg1 = registration();


                assert.equal("CK123123", reg1.regList("CK123123"));
            });

            it('should return nothing if the number plate starts with MP ', function () {

                let reg1 = registration();


                assert.equal(null, reg1.regList("mp123123"));
            });

            it('should return nothing if the number plate starts with numbers', function () {

                let reg1 = registration();


                assert.equal(null, reg1.regList("123123 GP"));
            });

            describe('registrations that have been displayed already', function () {
                

            it('should return object with registration number as a key with a value of zero', function () {

                let reg1 = registration();


                
                reg1.regList('CA 123 456')

            
                assert.deepEqual({'CA 123 456':0}, reg1.getReg());


            });


            it('should return empty object for empty input', function () {

                let reg1 = registration();


                
                reg1.regList('')

            
                assert.deepEqual({}, reg1.getReg());


            });

            it('should return object with registration numbers as keys followed by a value 0', function () {

                let reg1 = registration();

     

            
             reg1.regList("CA 123 123");
                reg1.regList("CA 234 567");
    
                assert.deepEqual({'CA 123 123':0 ,'CA 234 567':0}, reg1.getReg());
            });

            it('should not create another key if registration number has already been entered', function () {

                let reg1 = registration();

     

            
             reg1.regList("CA 123 123");
                reg1.regList("CA 234 567");
                reg1.regList("CA 123 123");
    
                assert.deepEqual({'CA 123 123':0 ,'CA 234 567':0}, reg1.getReg());
            });


            it('should give me the registration number entered', function () {

                let reg1 = registration();

     

            
             reg1.regList("CA 123 123");
               
    
                assert.equal('CA 123 123', reg1.getKeys());
            });

            it('should return null since the registration number has been displayed already', function () {

                let reg1 = registration();

     

            
            
             assert.equal('CA 123 123', reg1.regList('CA 123 123'));
             assert.equal(null, reg1.regList('CA 123 123'));

            });

            it('should return keys of object ', function () {

                let reg1 = registration();

     
                reg1.regList("CA 123 123");
                reg1.regList("CA 123 124");
                reg1.regList("CJ 123 124");
               
               
    
                assert.equal('CA 123 123,CA 123 124,CJ 123 124', reg1.getKeys());
    

            });

            describe('filter', function () {

            it('should return registrations starting with CA ', function () {

                let reg1 = registration();

     
                reg1.regList("CA 123 123");
                reg1.regList("CA 123 124");
                reg1.regList("CJ 123 124");
                
                reg1.filterTown('CA')
               
               
    
                assert.equal('CA 123 123,CA 123 124', reg1.getArr());
    

            });

            it('should return registrations starting with CJ ', function () {

                let reg1 = registration();

     
                reg1.regList("CJ 123 123");
                reg1.regList("CA 123 124");
                reg1.regList("CJ 123 124");
                
                reg1.filterTown('CJ')
               
               
    
                assert.equal('CJ 123 123,CJ 123 124', reg1.getArr());
    

            });


            it('should return registrations starting with CK ', function () {

                let reg1 = registration();

     
                reg1.regList("CK 123 123");
                reg1.regList("CA 123 124");
                reg1.regList("CK 123 124");
                reg1.regList("CJ 123 124");
                
                reg1.filterTown('CK')
               
               
    
                assert.equal('CK 123 123,CK 123 124', reg1.getArr());
    

            });

            it('should return nothing if registration numbers do not contain CA,CJ or CK ', function () {

                let reg1 = registration();

     
                reg1.regList("WC 123 123");
                reg1.regList("MP 123 124");
                reg1.regList("NC 123 124");
                reg1.regList("123 124");
                
                reg1.filterTown('CK')
               
               
    
                assert.deepEqual([], reg1.getArr());
    

            });



        });
          
        });

    });
});