import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { Screen } from '@/components/Screen';
import { TransactionForm } from '@/components/TransactionForm';
import { useSaveTransaction } from '@/hooks/useTransactions';
import { friendlyError } from '@/utils/errors';

export default function NewTransactionScreen() {
  const router = useRouter();
  const save = useSaveTransaction();

  return (
    //o Screen para ajustar as margens com base nas áreas seguras do telemóvel.
    <Screen scroll edges={['bottom', 'left', 'right']}>
      <TransactionForm
        //o estado isPending para colocar o botão em modo de carregamento.
        submitting={save.isPending}
        //a ação de submissão invocando o save.mutate com os dados do formulário.
        onSubmit={(input) =>
          save.mutate(
            { input },
            {
              onSuccess: () => router.back(),
              onError: (error) =>
                Alert.alert('Não foi possível salvar', friendlyError(error)),
            },
          )
        }
      />
    </Screen>
  );
}
