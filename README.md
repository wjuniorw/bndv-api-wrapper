# 🛡️ BNVD API Wrapper

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Um SDK moderno, modular e estritamente tipado (TypeScript) para interagir com a API do **Banco Nacional de Vulnerabilidades Cibernéticas (BNVD)**.

Construído com uma arquitetura limpa (*Clean Architecture*), este wrapper foi desenhado para ser integrado em ferramentas de automação, pipelines de CI/CD, CLI de segurança (SecOps) e plataformas de Threat Intelligence.

---

## ✨ Features

- **Tipagem Extrema (DTOs):** Autocomplete nativo no VS Code para toda a árvore de resposta do BNVD, métricas CVSS e matrizes MITRE ATT&CK.
- **Arquitetura Modular:** Instancie o cliente e acesse domínios isolados (`vulnerabilities`, `noticias`, `statistics`, `mitre`).
- **Resiliência:** Tratamento nativo de *Timeouts* via `AbortController` para evitar requisições travadas no seu backend.
- **Zero Dependências Pesadas:** Construído sobre a `Fetch API` nativa do Node.js (Node 18+). Compatível com CommonJS (`require`) e ESM (`import`).

---

## 🚀 Instalação (Atenção)

Este pacote está hospedado no **GitHub Packages** em vez do registro público do NPM. Para permitir o download fluido por qualquer desenvolvedor, configuramos um *Token de Acesso Pessoal (PAT)* exclusivamente com permissão de leitura (`read:packages`).

**É seguro usar e expor este token, ele não possui permissões de escrita.**

## Passo 1: Configurar o `.npmrc`
Na raiz do seu projeto (onde fica o seu `package.json`), crie um arquivo chamado `.npmrc` e adicione as seguintes linhas:

```properties
@wjuniorw:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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
```
E caso haja outros pacotes assim no seu projeto autentique por sequencia:
```
@wjuniorw:registry=https://npm.pkg.github.com/wjuniorw
//npm.pkg.github.com/wjuniorw:_authToken=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
;proximo:
//npm.pkg.github.com/:_authToken={outro_token}
@outroUser:registry=https://npm.pkg.github.com/outroUser
```

- - -
### Passo 2: Instalar o pacote
Agora você pode instalar o pacote normalmente usando o seu gerenciador favorito:

```bash
npm install @wjuniorw/bnvd-api-wrapper@latest
# ou
pnpm add @wjuniorw/bnvd-api-wrapper@latest
# ou
yarn add @wjuniorw/bnvd-api-wrapper@latest
```

---

## 💻 Como Usar

A biblioteca exporta a classe central `BNVDClient`. Instancie-a uma vez e utilize os domínios mapeados.

### Inicialização Básica

```typescript
import { BNVDClient } from '@wjuniorw/bnvd-api-wrapper';

// O cliente aceita configurações opcionais (como timeout personalizado e headers)
const bnvd = new BNVDClient({
  timeout: 15000, // 15 segundos
});
```

### 🚨 Domínio: Vulnerabilidades (CVEs)
Busque vulnerabilidades recentes, zero-days e detalhes específicos.

```typescript
// Buscar as 5 vulnerabilidades mais recentes com descrição em português
const recentes = await bnvd.vulnerabilities.getTop5Recent(true);

recentes.data?.forEach(vuln => {
  console.log(`[${vuln.cve.id}] ${vuln.cve.vulnStatus}`);
});

// Buscar vulnerabilidades críticas de um fabricante específico
const msCriticals = await bnvd.vulnerabilities.searchByVendor('microsoft', { 
  severity: 'CRITICAL' 
});
```

### 📰 Domínio: Notícias
Mantenha seu radar de inteligência de ameaças atualizado.

```typescript
// Buscar as 3 últimas notícias de segurança cibernética
const noticias = await bnvd.noticias.getRecent(3);

noticias.data?.forEach(noticia => {
  console.log(`📌 ${noticia.titulo} - Leia mais em bnvd.org/noticias/${noticia.slug}`);
});
```

### 🛡️ Domínio: MITRE ATT&CK
Consulte as matrizes, táticas, técnicas e mitigações oficiais.

```typescript
// Buscar detalhes de uma técnica de ataque específica (Ex: Phishing)
const technique = await bnvd.mitre.getTechnique('T1566', { translate: true });
console.log(technique.data);

// Listar grupos de ameaças (APT) mapeados
const grupos = await bnvd.mitre.listGroups();
```

### 📊 Domínio: Estatísticas
Obtenha o panorama numérico do banco de dados do BNVD.

```typescript
const stats = await bnvd.statistics.getGeneral();

console.log(`Total de CVEs Críticas cadastradas: ${stats.data?.by_severity.CRITICAL}`);
```

---

## 🛠️ Tratamento de Erros

O wrapper trata erros de API e de Timeout nativamente, lançando exceções claras. Recomenda-se o uso de blocos `try/catch`.

```typescript
try {
  const vuln = await bnvd.vulnerabilities.getById('CVE-2024-99999');
} catch (error) {
  console.error("Falha na consulta ao BNVD:", error.message);
  // Saída ex: "BNVD API Error: 404 Not Found" ou "Request timeout após 30000ms"
}
```

---

## 🤝 Contribuindo

Se você deseja adicionar novos endpoints ou melhorar as tipagens, PRs são muito bem-vindos!

1. Faça um *fork* do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça o commit das suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça o push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.
