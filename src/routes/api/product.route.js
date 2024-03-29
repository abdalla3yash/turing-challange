import { Router } from 'express';
import ProductController from '../../controllers/product.controller';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
// products router
router.get('/products', ProductController.getAllProducts);
router.get('/products/:product_id', ProductController.getProduct);
router.get('/products/search', ProductController.searchProduct);
router.get('/products/inCategory/:category_id', ProductController.getProductsByCategory);
router.get('/products/inDepartment/:department_id', ProductController.getProductsByDepartment);
// REVIEWS OF A PRODUCT
router.get('/products/:product_id/reviews',ProductController.getReviewsProduct);
router.post('/products/:product_id/reviews',ProductController.postProductReview);
// deparyments rauter
router.get('/departments', ProductController.getAllDepartments);
router.get('/departments/:department_id', ProductController.getDepartment);
// categories router
router.get('/categories', ProductController.getAllCategories);
router.get('/categories/:category_id',ProductController.getSingleCategory);
router.get('/categories/inDepartment/:department_id', ProductController.getDepartmentCategories);
router.get('/categories/inProduct/:product_id',ProductController.getProductCategory);


export default router;
