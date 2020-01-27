var Generator = require("yeoman-generator");

module.exports = class extends Generator {

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname.split(" ").join("-").toLowerCase(),
        store: true
      },
      {
        type: "input",
        name: "namespace",
        message: "Your project namespace",
        store: true
      },
      {
        type: "input",
        name: "author",
        message: "Your name",
        store: true
      },
      {
        type: "input",
        name: "packageDomain",
        message: "packages domain",
        store: true
      },
      {
        type: "input",
        name: "mainClass",
        message: "main class",
        store: true
      },
      {
        type: "input",
        name: "gitAuth",
        message: "git auth for Dependabot assignee",
        store: true
      },
      {
        type: "input",
        name: "gitEmailDomain",
        message: "git email domain for CI build",
        store: true
      },
    ]);
  }

  constructor(args, opts) {
    super(args, opts);
  }

  templates() {
    this.readme()
    this.docker()
    this.gitignore()
    this.github()
    this.maven()
    this.javaBe()
  }

  readme() {
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {}
    );
  }

  docker() {
    this.fs.copyTpl(
      this.templatePath("docker-compose.yml"),
      this.destinationPath("docker-compose.yml"),
      {
        namespace: this.answers.namespace,
        name: this.answers.name.split(" ").join("-").toLowerCase() + "-be",
        package: this.answers.packageDomain
      }
    );
  }

  gitignore() {
    this.fs.copyTpl(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore"),
      {}
    );
  }

  github() {
    this.fs.copyTpl(
      this.templatePath("github/workflows/settings.xml"),
      this.destinationPath(".github/workflows/settings.xml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("github/workflows/maven-build.yml"),
      this.destinationPath(".github/workflows/maven-build.yml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("dependabot/config.yml"),
      this.destinationPath(".dependabot/config.yml"),
      { gitAuth: this.answers.gitAuth }
    );
  }

  maven() {
    this.fs.copyTpl(
      this.templatePath("maven/jvm.config"),
      this.destinationPath(".mvn/jvm.config"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("maven/version-number-rules.xml"),
      this.destinationPath(this.answers.name + "-multi-module/" + "version-number-rules.xml"),
      {}
    );
  }

  pathBe() {
    return this.answers.name + "-multi-module/" + this.answers.name + "-be"
  }

  pathPackageBe() {
    return this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be"
  }

  pathAdapter() {
    return this.answers.name + "-multi-module/" + this.answers.name + "-adapter"
  }

  pathPackageAdapter() {
    return this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be"
  }

  pathDomain() {
    return this.answers.name + "-multi-module/" + this.answers.name + "-domain"
  }

  pathPackageDomain() {
    return this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be"
  }

  pathSwagger() {
    return this.answers.name + "-multi-module/" + this.answers.name + "-swagger"
  }

  pathPackageSwagger() {
    return this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be"
  }

  javaBe() {
    this.fs.copyTpl(
      this.templatePath("java/be/Application"),
      this.destinationPath(this.pathBe() + "/src/main/java/" + this.pathPackageBe() + "/meecrowave/" + "Application.java"),
      {
        packageDomain: this.answers.packageDomain,
        packageModule: this.answers.name.split("-").join(".").toLowerCase() + ".be"
      }
    );
    this.fs.copyTpl(
      this.templatePath("java/be/Api"),
      this.destinationPath(this.pathBe() + "/src/main/java/" + this.pathPackageBe() + "/meecrowave/" + "Api.java"),
      {
        packageDomain: this.answers.packageDomain,
        packageModule: this.answers.name.split("-").join(".").toLowerCase() + ".be"
      }
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathBe() + "/src/test/java/" + this.pathPackageBe() + "/meecrowave/" + ".gitkeep"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/meta-inf/microprofile-config.properties"),
      this.destinationPath(this.pathBe() + "/src/main/resources/META-INF/microprofile-config.properties"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/meecrowave/meecrowave.properties"),
      this.destinationPath(this.pathBe() + "/src/main/resources/meecrowave.properties"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/log4j2/log4j2-dev.xml"),
      this.destinationPath(this.pathBe() + "/src/main/resources/log4j2-dev.xml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/log4j2/log4j2.xml"),
      this.destinationPath(this.pathBe() + "/src/main/resources/log4j2.xml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/log4j2/empty-log.txt"),
      this.destinationPath(this.pathBe() + "/logs/app.log"),
      {}
    );
  }

  javaAdapter() {
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathAdapter() + "/src/test/java/" + this.pathPackageAdapter() + "/adapter/" + ".gitkeep"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathAdapter() + "/src/test/java/" + this.pathPackageAdapter() + "/api/" + ".gitkeep"),
      {}
    );
  }

  javaDomain() {
    this.fs.copyTpl(
      this.templatePath("java/domain/pom.xml"),
      this.destinationPath(this.pathDomain() + "/" + "pom.xml"),
      {
        mavenParentArtifactId: this.answers.name + "-multi-module",
        mavenParentGroupId: this.answers.packageDomain,
        mavenArtifactId: this.answers.name.toLowerCase() + "-be-domain",
        mavenName: this.answers.name.split("-").join(" ").toLowerCase() + " be domain"
      }
    );
    this.fs.copyTpl(
      this.templatePath("java/domain/RepositoryException"),
      this.destinationPath(this.pathDomain() + "/src/main/java/" + this.pathPackageDomain() + "/repository/" + "RepositoryException.java"),
      {
        packageDomain: this.answers.packageDomain,
        packageModule: this.answers.name.split("-").join(".").toLowerCase() + ".be"
      }
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathDomain() + "/src/main/java/" + this.pathPackageDomain() + "/model/" + ".gitkeep"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathDomain() + "/src/main/java/" + this.pathPackageDomain() + "/service/" + ".gitkeep"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathDomain() + "/src/test/java/" + this.pathPackageDomain() + "/model/" + ".gitkeep"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathDomain() + "/src/test/java/" + this.pathPackageDomain() + "/service/" + ".gitkeep"),
      {}
    );
  }

  javaSwagger() {
    this.fs.copyTpl(
      this.templatePath("java/swagger/pom.xml"),
      this.destinationPath(this.pathSwagger() + "/" + "pom.xml"),
      {
        mavenParentArtifactId: this.answers.name + "-multi-module",
        mavenParentGroupId: this.answers.packageDomain,
        mavenArtifactId: this.answers.name.toLowerCase() + "-be-swagger",
        mavenName: this.answers.name.split("-").join(" ").toLowerCase() + " be swagger"
      }
    );
    this.fs.copyTpl(
      this.templatePath("java/swagger/index.html"),
      this.destinationPath(this.pathSwagger() + "/src/main/resources/META-INF/resources" + "/" + "index.html"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("gitkeep"),
      this.destinationPath(this.pathSwagger() + "/src/test/java/" + this.pathPackageSwagger() + "/" + ".gitkeep"),
      {}
    );
  }

};
