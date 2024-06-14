import { Router } from "express";
import { CreateClientController } from "./controllers/Client/CreateClientController";
import { isAuthenticated } from "./middlewares/isAuth";
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


const router = Router()

// -------------------- 27 ROTAS ----------------------
// TASKS A FAZER AO FINALIZAR ROTAS:
// 1 - CRIAR MIDDLEWARE DE AUTENTICACAO ------- OK
// 2 - CRIAR ROTAS DE LOGIN E LOGOUT ------- 

//CLIENTES
// listar os saloes inscritos pelo cliente
router.get('/cliente/salao', isAuthenticated, new ListSalonByClientController().handle)
// criar cliente
router.post('/cliente', new CreateClientController().handle)
//login

//logout

// rota para inscrever o cliente ao salao


//COLABORADOR
// criar colaborador
router.post('/colaborador', new CreateCollaboratorController().handle)
// atualizar colaborador
router.put('/colaborador/:id', new UpdateCollaboratorController().handle)
// deletar colaborador
router.delete('/colaborador/:id', new DeleteCollaboratorController().handle)

//SALAO
// criar salao
router.post('/salao', new CreateSalonController().handle) 
// rota para listar todos salões no raio de filter(distancia alterável pelo usuario)
router.get('/salao/')
// listar detalhes do salao
// FALTA ADICIONAR O VERIFICADOR DE HORARIO UTILIZANDO O MOMENT OU ALGO DO TIPO
router.get('/salao/:id', new DetailSalonController().handle)
// listar clientes do salao
router.get('/salao/clientes/:id', new ListAllClientsController().handle)

//CUPOM
// criar cupom
router.post('/cupom', new CreateCouponController().handle) 
// atualizar cupom
router.put('/cupom/:id', new UpdateCouponController().handle)
// deletar cupom
router.delete('/cupom/:id', new DeleteCouponController().handle)
// listar cupons do salao
router.get('/cupom/salao/:id', new ListCouponBySalonController().handle)

//SERVICO
// criar servico
router.post('/servico', new CreateServiceController().handle) 
// atualizar servico
router.put('/servico/:id', new UpdateServiceController().handle)
// deletar arquivo do servico
router.post('/servico/delete-arquivo')
// deletar servico
router.delete('/servico/:id', new DeleteServiceController().handle)
// listar servicos do salao
router.get('/servico/salao/:id', new ListServicesBySalonController().handle)

//HORARIO/agenda
// criar horario
router.post('/horario', new CreateHoraryController().handle) 
// ??? 
router.post('/horario/colaboradores')
// atualizar horario
router.put('/horario/:id')
// deletar horario
router.delete('/horario/:id')
// listar horarios do salao
router.get('/horario/salao/:id')

//AGENDAMENTO
// criar agendamento
router.post('/agendamento', new CreateScheduleController().handle )
// filtrar agendamentos em data especificas
router.post('/agendamento/filter')
// verificar dias disponiveis 
router.post('/agendamento/dias-disponiveis')



export {router};

