import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteExistingData() {
    console.log("🧹 Clean database");
    await prisma.arrow.deleteMany();
    await prisma.requirement.deleteMany();
    await prisma.arrowData.deleteMany();
    await prisma.responsibility.deleteMany();
    await prisma.node.deleteMany();
    await prisma.procedure.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    await prisma.level.deleteMany();
    await prisma.levelCategory.deleteMany();
    await prisma.assignmentArea.deleteMany();
}

async function main() {
    await deleteExistingData();
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
            ParentLevel: {
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
            ParentLevel: {
                connect: {
                    machineName: serviceAxisLevel.machineName
                }
            }
        }
    });

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

    console.log("🏗 Seeding Projects");
    const firstProject = await prisma.project.create({
        data: {
            name: "Project 1",
            machineName: "project_1",
            description: "This is project 1",
            goal: 100,
            progressUnit: "Unit 1",
            archiveBox: "Box 1",
            account: "Account 1",
            leader: {
                connect: {
                    id: qUser.id
                }
            },
            level: {
                connect: {
                    machineName: firstServiceObjectiveLevel.machineName
                }
            }
        }
    });

    const costumerCapture = await prisma.node.create({
        data: {
            label: "Captacion de clientes",
            description: "En este paso se captan los clientes que desean vender su propiedad",
            type: "NODE",
            meta: {
                position: {
                    x: 0,
                    y: 0,
                },
                width: 120,
                height: 42,
            },
            Project: {
                connect: {
                    id: firstProject.id
                }
            }
        }
    });

    const propertyRegister = await prisma.node.create({
        data: {
            label: "Registro de propiedad",
            description: "This is node 2",
            type: "NODE",
            meta: {
                position: {
                    x: 390,
                    y: 0,
                },
                width: 120,
                height: 42,
            },
            Project: {
                connect: {
                    id: firstProject.id
                }
            }
        }
    });

    const arrowResponsability = await prisma.responsibility.create({
        data: {
            collaborators: {
                connect: {
                    id: qUser.id
                }
            }
        }
    });

    const arrowData = await prisma.arrowData.create({
        data: {
            id: "arrow_data_1",
            indicators: {},
            procedure: {},
            responsability: {
                connect: {
                    id: arrowResponsability.id
                }
            },
            requirements: {
                createMany: {
                    data: [
                        {
                            label: "Requirement 1",
                            machineName: "requirement_1",
                            value: true,
                        },
                        {
                            label: "Requirement 2",
                            machineName: "requirement_2",
                            value: false,
                        }
                    ]
                }
            },
        }
    })

    const arrow = await prisma.arrow.create({
        data: {
            label: "Cliente Conforme",
            source: {
                connect: {
                    id: costumerCapture.id
                }
            },
            target: {
                connect: {
                    id: propertyRegister.id
                }
            },
            arrowData: {
                connect: {
                    id: arrowData.id
                }
            },
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });