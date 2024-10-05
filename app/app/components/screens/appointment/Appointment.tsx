import { FC, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAppointment } from './useAppointment';
import { useTypedRoute } from '@/hooks/useTypedRoute';

import BasicHeader from '../../ui/basic-header/Header';
import DateSelector from './DateSelector/DateSelector';
import ProfessionalSelector from './ProfessionalSelector/ProfessionalSelector';
import HorarySelector from './HorarySelector/HorarySelector';
import CustomModal from '@/components/ui/custom-modal/CustomModal';
import CheckoutModal from './CheckoutModal/CheckoutModal';
import Loader from '@/components/ui/Loader';
import { IEmployee, IScheduleItem } from '@/types/appointment.interface';

const Appointment: FC = () => {
    const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [showModal, setShowModal] = useState(false);
    const [employeeName, setEmployeeName] = useState<string | null>(null);

    const { params } = useTypedRoute<'Appointment'>();
    const {
        salonName,
        salonServiceName,
        salonAvatar,
        salonServiceDuration,
        salonServicePrice
    } = params;

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const { isLoading, appointment } = useAppointment(formattedDate);

    const filteredAppointment = appointment?.schedule.find(
        (item: IScheduleItem) => Object.keys(item)[0] === formattedDate
      )?.[formattedDate]; 

      const handleSelectProfessional = (professionalId: string) => {
        setSelectedProfessional(professionalId);
      };

    const handleSelectTime = (time: string) => {
        setSelectedTime(time);
    };
    
    const handleOpenModal = () => {
        setShowModal(true)
    }

    const availableTimes = () => {
        const professional = filteredAppointment?.employees.find(
          (emp: IEmployee) => emp.id === selectedProfessional
        );
        return professional ? professional.times : [];
      };




    return (
        <Layout withoutPadding>
            <BasicHeader title="Agendamento" />
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <ProfessionalSelector
                        appointment={filteredAppointment}
                        selectedDate={formattedDate}
                        onSelectProfessional={handleSelectProfessional}
                    />

                    {selectedProfessional && (
                        <HorarySelector
                            availableTimes={availableTimes()}
                            onSelectTime={handleSelectTime}
                            selectedTime={selectedTime}
                            showModal={handleOpenModal}
                        />
                    )}
                </>
            )}
            <CustomModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                initialHeight={400}
            >
                <CheckoutModal
                    closeModal={() => setShowModal(false)}
                    salonName={salonName}
                    salonServiceName={salonServiceName}
                    salonAvatar={salonAvatar}
                    selectedDate={formattedDate}
                    selectedTime={selectedTime || ''}
                    employeeName={employeeName || ''}
                    price={salonServicePrice}
                    duration={salonServiceDuration}
                />
            </CustomModal>
        </Layout>
    );
};

export default Appointment;
