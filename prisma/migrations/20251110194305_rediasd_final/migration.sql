BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Rol] (
    [Id_Rol] INT NOT NULL IDENTITY(1,1),
    [Nombre] VARCHAR(100) NOT NULL,
    CONSTRAINT [Rol_pkey] PRIMARY KEY CLUSTERED ([Id_Rol])
);

-- CreateTable
CREATE TABLE [dbo].[Entidad] (
    [Id_Entidad] INT NOT NULL IDENTITY(1,1),
    [Nombre] VARCHAR(100) NOT NULL,
    CONSTRAINT [Entidad_pkey] PRIMARY KEY CLUSTERED ([Id_Entidad])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [Id_Usuario] INT NOT NULL IDENTITY(1,1),
    [Nombre] VARCHAR(100) NOT NULL,
    [Apellido] VARCHAR(100) NOT NULL,
    [Email] VARCHAR(100) NOT NULL,
    [Id_Entidad] INT NOT NULL,
    [Id_Rol] INT NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([Id_Usuario])
);

-- CreateTable
CREATE TABLE [dbo].[Persona] (
    [Id_Persona] INT NOT NULL IDENTITY(1,1),
    [Nombre] VARCHAR(100) NOT NULL,
    [Apellido] VARCHAR(100) NOT NULL,
    [Dni] INT NOT NULL,
    [Fecha_Nacimiento] DATE NOT NULL,
    [Telefono] VARCHAR(100) NOT NULL,
    [Email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Persona_pkey] PRIMARY KEY CLUSTERED ([Id_Persona])
);

-- CreateTable
CREATE TABLE [dbo].[Curriculo] (
    [Id_Curriculo] INT NOT NULL IDENTITY(1,1),
    [Id_Persona] INT NOT NULL,
    [Profesion] VARCHAR(100) NOT NULL,
    [Experiencia] NVARCHAR(1000),
    [Adjunto_CV] NVARCHAR(1000),
    CONSTRAINT [Curriculo_pkey] PRIMARY KEY CLUSTERED ([Id_Curriculo])
);

-- CreateTable
CREATE TABLE [dbo].[Recomendacion] (
    [Id_Recomendacion] INT NOT NULL IDENTITY(1,1),
    [Id_Persona] INT NOT NULL,
    [Id_Entidad] INT NOT NULL,
    [Id_Usuario] INT NOT NULL,
    [Fecha_Recomendacion] DATE NOT NULL CONSTRAINT [Recomendacion_Fecha_Recomendacion_df] DEFAULT CURRENT_TIMESTAMP,
    [Activo] BIT NOT NULL CONSTRAINT [Recomendacion_Activo_df] DEFAULT 1,
    [Perfil_Profesional] NVARCHAR(1000),
    [Persona_Recomienda] NVARCHAR(1000),
    [Email_Recomienda] NVARCHAR(1000),
    [Telefono_Recomienda] NVARCHAR(1000),
    CONSTRAINT [Recomendacion_pkey] PRIMARY KEY CLUSTERED ([Id_Recomendacion])
);

-- CreateTable
CREATE TABLE [dbo].[Motivo_Desvinculacion] (
    [Id_Motivo] INT NOT NULL IDENTITY(1,1),
    [Nombre] VARCHAR(100) NOT NULL,
    CONSTRAINT [Motivo_Desvinculacion_pkey] PRIMARY KEY CLUSTERED ([Id_Motivo])
);

-- CreateTable
CREATE TABLE [dbo].[Desvinculacion] (
    [Id_Desvinculacion] INT NOT NULL IDENTITY(1,1),
    [Id_Persona] INT NOT NULL,
    [Id_Entidad] INT NOT NULL,
    [Id_Motivo] INT NOT NULL,
    [Persona_Referencia] NVARCHAR(1000),
    [Email_Referencia] NVARCHAR(1000),
    [Telefono_Referencia] NVARCHAR(1000),
    CONSTRAINT [Desvinculacion_pkey] PRIMARY KEY CLUSTERED ([Id_Desvinculacion])
);

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_Id_Entidad_fkey] FOREIGN KEY ([Id_Entidad]) REFERENCES [dbo].[Entidad]([Id_Entidad]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_Id_Rol_fkey] FOREIGN KEY ([Id_Rol]) REFERENCES [dbo].[Rol]([Id_Rol]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Curriculo] ADD CONSTRAINT [Curriculo_Id_Persona_fkey] FOREIGN KEY ([Id_Persona]) REFERENCES [dbo].[Persona]([Id_Persona]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recomendacion] ADD CONSTRAINT [Recomendacion_Id_Persona_fkey] FOREIGN KEY ([Id_Persona]) REFERENCES [dbo].[Persona]([Id_Persona]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recomendacion] ADD CONSTRAINT [Recomendacion_Id_Entidad_fkey] FOREIGN KEY ([Id_Entidad]) REFERENCES [dbo].[Entidad]([Id_Entidad]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Recomendacion] ADD CONSTRAINT [Recomendacion_Id_Usuario_fkey] FOREIGN KEY ([Id_Usuario]) REFERENCES [dbo].[Usuario]([Id_Usuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Desvinculacion] ADD CONSTRAINT [Desvinculacion_Id_Persona_fkey] FOREIGN KEY ([Id_Persona]) REFERENCES [dbo].[Persona]([Id_Persona]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Desvinculacion] ADD CONSTRAINT [Desvinculacion_Id_Entidad_fkey] FOREIGN KEY ([Id_Entidad]) REFERENCES [dbo].[Entidad]([Id_Entidad]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Desvinculacion] ADD CONSTRAINT [Desvinculacion_Id_Motivo_fkey] FOREIGN KEY ([Id_Motivo]) REFERENCES [dbo].[Motivo_Desvinculacion]([Id_Motivo]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
