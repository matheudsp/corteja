import { Router } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { isAuthenticated } from "./middlewares/isAuth";
import { ListSalonByClientController } from "./controllers/ListSalonByClientController";
import { CreateCollaboratorController } from "./controllers/CreateCollaboratorController";
import { CreateSalonController } from "./controllers/CreateSalonController";
import { CreateServiceController } from "./controllers/CreateServiceController";
import { CreateCouponController } from "./controllers/CreateCouponController";
import { CreateScheduleController } from "./controllers/CreateScheduleController";

const router = Router()

// -------------------- 27 ROTAS ----------------------
// TASKS A FAZER AO FINALIZAR ROTAS:
// 1 - CRIAR MIDDLEWARE DE AUTENTICACAO ------- OK
// 2 - CRIAR ROTAS DE LOGIN E LOGOUT ------- 

//CLIENTES
// listar os saloes inscritos pelo cliente
router.get('/cliente/saloes', isAuthenticated, new ListSalonByClientController().handle)
// criar cliente
router.post('/cliente', new CreateClientController().handle)


//COLABORADOR
// criar colaborador
router.post('/colaborador', new CreateCollaboratorController().handle)
// filtrar colaboradores
router.post('/colaborador/filter') 
// atualizar colaborador
router.put('/colaborador/:id')
// deletar colaborador
router.delete('/colaborador/vinculo/:id')

//SALAO
// criar salao
router.post('/salao', new CreateSalonController().handle) 
// listar servicos do salao
router.get('/salao/servicos/:id')
// listar detalhes do salao
router.get('/salao/filter/:id')
// listar clientes do salao
router.get('/salao/filter/clientes/:id')

//CUPOM
// criar cupom
router.post('/cupom', new CreateCouponController().handle) 
// atualizar cupom
router.put('/cupom/:id')
// deletar cupom
router.delete('/cupom/:id')
// listar cupons do salao
router.get('/cupom/salao/:id')

//SERVICO
// criar servico
router.post('/servico', new CreateServiceController().handle) 
// atualizar servico
router.put('/servico/:id')
// deletar arquivo do servico
router.post('/servico/delete-arquivo')
// deletar servico
router.delete('/servico/:id')
// listar servicos do salao
router.get('/servico/salao/:id')

//HORARIO/agenda
// criar horario
router.post('/horario', new CreateScheduleController().handle) 
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
router.post('/agendamento')
// filtrar agendamentos em data especificas
router.post('/agendamento/filter')
// verificar dias disponiveis 
router.post('/agendamento/dias-disponiveis')



export {router};

