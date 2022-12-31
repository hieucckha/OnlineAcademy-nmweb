import categoryService from '../services/category.service.js';

(async () => {
  await categoryService.insert(
    '1870de01-b21f-47c5-8e0a-ae3833bba654',
    'Web Development'
  );
  await categoryService.insert(
    '1870de01-b21f-47c5-8e0a-ae3833bba654',
    'Data Science'
  );
  await categoryService.insert(
    '1870de01-b21f-47c5-8e0a-ae3833bba654',
    'Mobile Development'
  );
  await categoryService.insert(
    '1870de01-b21f-47c5-8e0a-ae3833bba654',
    'Programming Languages'
  );
  await categoryService.insert(
    '1870de01-b21f-47c5-8e0a-ae3833bba654',
    'Game Development'
  );

  console.log(await categoryService.getList());
  // const listCategoryObject = await categoryService.getList();
  // const listCategory = listCategoryObject.map((category) => {
  //   return category.category_id;
  // });
  // listCategory.forEach(async (categoryId) => {
  //   console.log(
  //     `${categoryId} is delete: `,
  //     await categoryService.delete(categoryId)
  //   );
  // });
})();
