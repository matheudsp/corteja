import { FC, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAppointment } from './useAppointment';

import BasicHeader from '../../ui/basic-header/Header';
import DateSelector from './DateSelector/DateSelector';
import ProfessionalSelector from './ProfessionalSelector/ProfessionalSelector';
import HorarySelector from './HorarySelector/HorarySelector';
import CustomModal from '@/components/ui/custom-modal/CustomModal';
import CheckoutModal from './CheckoutModal/CheckoutModal';
import Loader from '@/components/ui/Loader';
import { IEmployee, IScheduleItem } from '@/types/appointment.interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Appointment: FC = () => {
    const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState(false);
    const [employeeName, setEmployeeName] = useState<string | null>(null);
    const [employeeAvatar, setEmployeeAvatar] = useState<string | null>(null);
    const salonName = useSelector((state: RootState) => state.salon.salonName);
    const salonServiceName = useSelector((state: RootState) => state.salon.salonServiceName);
    const salonAvatar = useSelector((state: RootState) => state.salon.salonAvatar);
    const salonServicePrice = useSelector((state: RootState) => state.salon.salonServicePrice);
    const salonServiceDuration = useSelector((state: RootState) => state.salon.salonServiceDuration);

    

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const { isLoading, appointment } = useAppointment(formattedDate);

    const filteredAppointment = appointment?.schedule.find(
        (item: IScheduleItem) => Object.keys(item)[0] === formattedDate
    )?.[formattedDate];

    const handleSelectProfessional = (professionalId: string, professionalName: string, professionalAvatar: string) => {
        setSelectedProfessional(professionalId);
        setEmployeeName(professionalName);
        setEmployeeAvatar(professionalAvatar)
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
            <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
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
                initialHeight={350}

            >
                <CheckoutModal
                    closeModal={() => setShowModal(false)}
                    salonName={salonName}
                    salonServiceName={salonServiceName}
                    salonAvatar={salonAvatar}
                    selectedDate={formattedDate}
                    selectedTime={selectedTime || ''}
                    employeeName={employeeName || ''}
                    employeeAvatar={employeeAvatar || ''}
                    price={salonServicePrice}
                    duration={salonServiceDuration}
                />
            </CustomModal>
        </Layout>
    );
};

export default Appointment;
