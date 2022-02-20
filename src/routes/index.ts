import { transactionValidation } from "./../models/transaction";
import calculateCommission from "../controllers/commission";

const initRoutes = (app: any) => {
  app.post("/commission", transactionValidation, calculateCommission);
};

export default initRoutes;
