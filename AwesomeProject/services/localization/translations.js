import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
    en: {
        BotaoNotas: 'NOTES',
        Botao: 'Delete',
        BotaoLogin: 'LOGIN',
        Password: 'Password',
        Email: 'Email',
        Fechar: 'Close',
        Inserir: 'Insert',
        Continuar: 'Continue',
        EP: 'Enter an email and password',
        E: 'Enter an email',
        P: 'Enter a password',
        LoginF: 'Login Failed',
        Loginok: 'Signed in',
        InserirA: 'Insert Subject',
        InserirD: 'Insert Description',
        InserirNota: 'Insert New Note',
        Assunto:'Subject',
        Descricao:'Description',
        EliminarN:'Delete Note',
        Sim:'Yes',
        Nao:'No',
        Info:'Information',
        MsgRemover:'Delete Note?',
        AtualizarN:'Update Note',
        ok:'OK',
        Registo:'Successfully updated',
        Falha:'Update failed',
        ListaN:'Notes List',
        DetalhesN:'Note Details',
    },
    pt: {
        BotaoNotas: 'NOTAS',
        Botao: 'Apagar',
        BotaoLogin: 'LOGIN',
        Password: 'Password',
        Email: 'Email',
        Fechar: 'Close',
        Inserir: 'Inserir',
        Continuar: 'Continuar',
        Login: 'Informação',
        EP: 'Insira um email e uma password',
        E: 'Insira um email',
        P: 'Insira uma password',
        LoginF: 'Login Falhou',
        Loginok: 'Login Efetuado',
        InserirA: 'Inserir Assunto',
        InserirD: 'Inserir Descrição',
        InserirNota: 'Inserir Nova Nota',
        Assunto:'Assunto',
        Descricao:'Descrição',
        EliminarN:'Eliminar Nota',
        Sim: 'Sim',
        Não:'Não',
        Info:'Informação',
        MsgRemover:'Remover Nota?',
        AtualizarN:'Atualizar Nota',
        ok:'OK',
        Registo:'O registo foi atualizado com sucesso',
        Falha:'Atualização falhou',
        ListaN:'Lista de Notas',
        DetalhesN:'Detalhes da Nota',
    }
};

export default new LocalizedStrings(translations);
