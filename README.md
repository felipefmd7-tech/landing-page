# ProBio Solutions — Landing page

Versão independente, criada em landing_page_codex. A página anterior foi preservada.

## Conteúdo e funcionalidades
- Identidade própria com monograma vetorial, logotipo horizontal e variações.
- Exemplos interativos de condição térmica, qualidade do CIP e bateladas.
- Conversa demonstrativa com respostas predefinidas; não chama o agente real.
- Calculadora econômica com produção, aumento relativo, margem, dias e custo total da ação.
- Memória de cálculo, encaminhamento do cenário para WhatsApp e perguntas frequentes.
- Contato comercial: +55 16 99145-7282.

## Dados e comunicação
Todos os números, dornas e cenários apresentados são fictícios. Nenhum PDF original, marca de terceiro, dado de cliente, credencial, banco de dados ou série real integra este site. As categorias de diagnóstico foram conferidas no projeto informado pelo responsável.

A integração de WhatsApp foi informada como funcional e em fase final de desenvolvimento. A documentação consultada descreve validação em homologação; a FAQ preserva essa distinção. Os botões comerciais abrem a conversa com o número autorizado. Nenhuma mensagem é enviada automaticamente.

A calculadora é um simulador de cenário, não um motor que prevê o ganho de uma recomendação. Os valores iniciais são ilustrativos, não preço comercial. Aumento relativo de produção não equivale a pontos percentuais de rendimento. Ganho potencial e resultado observado são apresentados separadamente.

## Desenvolvimento
`npm install`
`npm run dev`
`npm run build`
`npm run lint`
`node --experimental-strip-types tests/roi.mjs`

As dependências e o arquivo de versões do starter Sites foram mantidos. Componentes de interface não utilizados do starter foram removidos. A jornada principal é leitura e contato; não há autenticação própria, captura de dados em formulários ou conexão com banco industrial.

## Marca
Arquivos em public/brand: symbol.svg, logo-probio.svg, logo-probio-monocromatico.svg e logo-probio-branco.svg. O guia identidade.md descreve a paleta e o conceito.

## Verificação
Build, análise de código, tipos, aritmética e casos-limite da calculadora; verificação HTTP e de links internos do HTML renderizado. Não foi realizada inspeção visual automatizada em navegador.
