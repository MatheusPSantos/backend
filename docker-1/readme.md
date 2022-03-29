# Docker: cirando e gerenciando containers

## Conhecendo o problema
- conflito de portas
- alteração de versão de maneira prática
- controle de recurso de memória de cpu
- processo de manutenção

Máquinas virtuais:
- Camada de SO virtualizado, uma camada de Hypervisor, um SO rodando
 em cima de um hardware.

Containers:
- Camada do container roda diretamente do SO original
- Por que são mais leves?
> Os containers vão funcionar diretamente como processos dentro do
nosso sistema. Os recursos que eles precisam usar são menores 

- Como garantem o isolamento?
> Usa um conceito chamado namespace, PID - isolamento de processo,
 NET - Provê isolamento das interfaces de rede
 IPC - isolamento de comunicação de processos e memórias compartilhada
 MNT - Provê isolamento do sistema de arquivos/ pontos de montagem
 UTS - Provê isolamento do kernel. Age como se o container fosse outro
 host.

- Como funcionam sem "instalar um SO"?
> O container permite um acesso ao kernel do SO, porém isolado. 

- Como fica a divisão de recursos do sistema?
> CGroups, permite definir de maneira automática ou manual como os consumos
serão feitas para cada um dos containers do SO.




