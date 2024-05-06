import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🧹 Clean database");
    await prisma.level.deleteMany();
    await prisma.levelCategory.deleteMany();
    await prisma.assignmentArea.deleteMany();
    await prisma.user.deleteMany();

    console.log("🌱 Seeding database");

    console.log("📊 Seeding Level Category");

    const generalLevelCategory = await prisma.levelCategory.create({
        data: {
            name: "General",
            machineName: "general",
            description: "Nivel máximo superior de la organización",
        }
    });
    const guidingAxesLevelCategory = await prisma.levelCategory.create({
        data: {
            name: "Ejes Rectores",
            machineName: "ejes-rectores",
            description: "Nivel para agregar los ejes rectores para el cumplimiento de misión y visión de la organización",
        }
    })
    const objectivesLevelCategory = await prisma.levelCategory.create({
        data: {
            name: "Objetivos",
            machineName: "objetivos",
            description: "Nivel para agregar los objetivos que aportan al logro de un eje rector",
        }
    })
    const projectsLevelCategory = await prisma.levelCategory.create({
        data: {
            name: "Proyectos",
            machineName: "proyectos",
            description: "En este nivel se agregan proyectos, programas o planes para cumplir un objetivo",
        }
    })

    console.log("🏛 Seeding Level");
    const organizationLevel = await prisma.level.create({
        data: {
            name: "Organización",
            machineName: "organizacion",
            description: "Nivel de la organización",
            Category: {
                connect: {
                    machineName: generalLevelCategory.machineName
                }
            }
        }
    });
    const serviceAxisLevel = await prisma.level.create({
        data: {
            name: "Eje de Servicio",
            machineName: "eje-servicio",
            description: "Eje de servicio de la organización",
            Category: {
                connect: {
                    machineName: guidingAxesLevelCategory.machineName
                }
            },
            PreviousLevel: {
                connect: {
                    machineName: organizationLevel.machineName
                }
            }
        }
    });
    const firstServiceObjectiveLevel = await prisma.level.create({
        data: {
            name: "Objetivo 1",
            machineName: "objetivo-1",
            description: "Primer objetivo del eje de servicio",
            Category: {
                connect: {
                    machineName: objectivesLevelCategory.machineName
                }
            },
            PreviousLevel: {
                connect: {
                    machineName: serviceAxisLevel.machineName
                }
            }
        }
    });
    const operativeProcessesLevel = await prisma.level.create({
        data: {
            name: "Procesos Operativos",
            machineName: "procesos-operativos",
            description: "Procesos operativos de la organización",
            Category: {
                connect: {
                    machineName: guidingAxesLevelCategory.machineName
                }
            },
            PreviousLevel: {
                connect: {
                    machineName: organizationLevel.machineName
                }
            }
        }
    });
    console.log({
        organizationLevel,
        serviceAxisLevel,
        firstServiceObjectiveLevel,
        operativeProcessesLevel
    })

    console.log("👑 Seeding Assignment Area");
    const directionAssignmentArea = await prisma.assignmentArea.create({
        data: {
            name: "Dirección",
            machineName: "direccion",
            description: "Área de la dirección de la organización",
        }
    });
    const socialSubdirectionAssignmentArea = await prisma.assignmentArea.create({
        data: {
            name: "Subdirección Social",
            machineName: "subdireccion-social",
            description: "Subdirección Social",
            ParentArea: {
                connect: {
                    machineName: directionAssignmentArea.machineName
                }
            }
        }
    });
    const socialDevelopmentDepartmentAssignmentArea = await prisma.assignmentArea.create({
        data: {
            name: "Departamento de Desarrollo Social",
            machineName: "departamento-desarrollo-social",
            description: "Departamento de Desarrollo Social",
            ParentArea: {
                connect: {
                    machineName: socialSubdirectionAssignmentArea.machineName
                }
            }
        }
    });
    const technicalDepartmentAssignmentArea = await prisma.assignmentArea.create({
        data: {
            name: "Departamento Técnico",
            machineName: "departamento-tecnico",
            description: "Departamento Técnico",
            ParentArea: {
                connect: {
                    machineName: directionAssignmentArea.machineName
                }
            }
        }
    });
    console.log({
        directionAssignmentArea,
        socialSubdirectionAssignmentArea,
        technicalDepartmentAssignmentArea,
        socialDevelopmentDepartmentAssignmentArea,
    })

    console.log("🧍 Seeding users");
    const qUser = await prisma.user.create({
        data: {
            avatar: "fake-avatar",
            email: "q@qq.com",
            name: "Test User",
            identification: "0",
            position: "Admin",
            assignmentArea: {
                connect: {
                    machineName: directionAssignmentArea.machineName
                }
            }
        }
    });
    console.log({ qUser });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })