import { Router } from "express";
import multer from "multer";

// middleware
import { isAuthenticated } from "./middlewares/isAuth";
import uploadConfig from './config/multer'

// routes
import { CreateClientController } from "./controllers/Auth/CreateClientController";
import { ListSalonByClientController } from "./controllers/Client/ListSalonByClientController";
import { CreateCollaboratorController } from "./controllers/Collaborator/CreateCollaboratorController";
import { CreateSalonController } from "./controllers/Salon/CreateSalonController";
import { CreateServiceController } from "./controllers/Service/CreateServiceController";
import { CreateCouponController } from "./controllers/Coupon/CreateCouponController";
import { CreateHoraryController } from "./controllers/Horary/CreateHoraryController";
import { CreateScheduleController } from "./controllers/Schedule/CreateScheduleController";
import { UpdateCollaboratorController } from "./controllers/Collaborator/UpdateCollaboratorController";
import { DeleteCollaboratorController } from "./controllers/Collaborator/DeleteCollaboratorController";
import { ListServicesBySalonController } from "./controllers/Service/ListServicesBySalonController";
import { DetailSalonController } from "./controllers/Salon/DetailSalonController";
import { ListAllClientsController } from "./controllers/Salon/ListAllClientsController";
import { UpdateCouponController } from "./controllers/Coupon/UpdateCouponController";
import { DeleteCouponController } from "./controllers/Coupon/DeleteCouponController";
import { ListCouponBySalonController } from "./controllers/Coupon/ListCouponBySalonController";
import { UpdateServiceController } from "./controllers/Service/UpdateServiceController";
import { DeleteServiceController } from "./controllers/Service/DeleteServiceController";
import { UpdateHoraryController } from "./controllers/Horary/UpdateHoraryController";
import { DeleteHoraryController } from "./controllers/Horary/DeleteHoraryController";
import { ListHoraryController } from "./controllers/Horary/ListHoraryBySalonController";
import { ListHoraryByServiceController } from "./controllers/Horary/ListHoraryByServiceController";
import { ListCollaboratorsBySalonController } from "./controllers/Collaborator/ListCollaboratorsBySalonController";
import { FilterSalonController } from "./controllers/Salon/FilterSalonController";
import { ListScheduleByDisponibilityController } from "./controllers/Schedule/ListScheduleByDisponibilityController";
import { FilterScheduleController } from "./controllers/Schedule/FilterScheduleController";
import { SubscribeSalonController } from "./controllers/Client/SubscribeSalonController";
import { DeleteSalonController } from "./controllers/Salon/DeleteSalonController";
import { UpdateSalonController } from "./controllers/Salon/UpdateSalonController";
import { AuthUserController } from "./controllers/Auth/AuthClientController";
import { GetNewTokensController } from "./controllers/Auth/GetNewTokensController";

const router = Router()
const upload = multer(uploadConfig.upload("./uploads"));


//AUTH
// criar cliente
router.post('/auth/register', new CreateClientController().handle)
//login
router.post('/auth/login', new AuthUserController().handle)
//get new tokens
router.post('/auth/login/access-token', new GetNewTokensController().handle)


//CLIENTES
// listar os saloes inscritos pelo cliente
router.get('/cliente/salao', isAuthenticated, new ListSalonByClientController().handle)

// rota para inscrever o cliente ao salao
router.get('/cliente/:id/favoritar',  isAuthenticated,new SubscribeSalonController().handle)

//COLABORADOR
// criar colaborador
router.post('/colaborador', upload.single('foto'), new CreateCollaboratorController().handle)
// atualizar colaborador
router.put('/colaborador/:id', upload.single('foto'),new UpdateCollaboratorController().handle)
// deletar colaborador
router.delete('/colaborador/:id', new DeleteCollaboratorController().handle)
// // deletar arquivo do colaborador
// router.post('/colaborador/delete-arquivo')

//SALAO
// criar salao
router.post('/salao',  upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'capa', maxCount: 1 }]), new CreateSalonController().handle) 
// deletar salao
router.delete('/salao/:id', new DeleteSalonController().handle)
// atualizar salao
router.put('/salao/:id', new UpdateSalonController().handle)
// rota para listar todos salões no raio de filter(distancia alterável pelo usuario, cidade, nome)
router.post('/salao/filter', new FilterSalonController().handle)
// listar detalhes do salao
router.get('/salao/:id', new DetailSalonController().handle)
// listar clientes do salao
router.get('/salao/clientes/:id', new ListAllClientsController().handle)
// listar colaboradores do salao
router.get('/salao/colaboradores/:id', new ListCollaboratorsBySalonController().handle)
// listar horarios do salao
router.get('/salao/horarios/:id', new ListHoraryController().handle)
// listar cupons do salao
router.get('salao/cupons/:id', new ListCouponBySalonController().handle)
// listar servicos do salao
router.get('salao/servicos/:id', new ListServicesBySalonController().handle)
// // deletar arquivo do salao
// router.post('/salao/delete-arquivo')

//CUPOM
// criar cupom
router.post('/cupom', new CreateCouponController().handle) 
// atualizar cupom
router.put('/cupom/:id', new UpdateCouponController().handle)
// deletar cupom
router.delete('/cupom/:id', new DeleteCouponController().handle)

//SERVICO
// criar servico
router.post('/servico', upload.single('foto'), new CreateServiceController().handle) 
// atualizar servico
router.put('/servico/:id', new UpdateServiceController().handle)
// deletar servico
router.delete('/servico/:id', new DeleteServiceController().handle)
// // deletar arquivo do servico
// router.post('/servico/delete-arquivo')


//HORARIO/agenda
// criar horario
router.post('/horario', new CreateHoraryController().handle) 
// listar horarios disponiveis de colaboradores pelo id do servico
router.post('/horario/colaboradores',new ListHoraryByServiceController().handle)
// atualizar horario
router.put('/horario/:id', new UpdateHoraryController().handle)
// deletar horario
router.delete('/horario/:id', new DeleteHoraryController().handle)


//AGENDAMENTO 
// criar agendamento
router.post('/agendamento', new CreateScheduleController().handle )
// filtrar agendamentos em data especificas
router.post('/agendamento/filter', new FilterScheduleController().handle)
// verificar dias disponiveis 
router.post('/agendamento/dias-disponiveis', new ListScheduleByDisponibilityController().handle)



export {router};

