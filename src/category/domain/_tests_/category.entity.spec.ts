import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";


describe('Category unit testes', () => {
   test('Contructor', () => {
      const createdAt = new Date();
      let category = new Category({
        name:'Movie'
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);

      category = new Category({
        name:'Movie',
        description:'Movie description',
        is_active:false,
        created_at:createdAt
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(createdAt);
      
   })

   test('should be able change name', () => {
      let category = new Category({
        name:'Movie'
      });

      category.changeName('New Name');
      expect(category.name).toBe('New Name');
   });

   test('Should be able changeDescription', () => {
      let category = new Category({
        name:'Movie',
        description:'Desc'
      });

      category.changeDescription('DC');
      expect(category.description).toBe('DC');
   });

   test('Should be able change active', () => {
      let category = new Category({
        name:'Movie',
        description:'MCU',
        is_active:false
      });

      category.activate();
      expect(category.is_active).toBe(true);
   });

   test('Should be deactive', () => {
     let category = new Category({
      name:'Movie',
      description:'MCU',
      is_active:true
     });
     
     category.deactivate();
     expect(category.is_active).toBe(false);
   });

   describe('category_id field', () => {
    const arrange = [
      {category_id:null}, {category_id: undefined}, {category_id: new Uuid()}
    ];

    test.each(arrange)('id = %j', ({category_id}) => {
      const category = new Category({
        name:'Movie',
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
    })
   })
});