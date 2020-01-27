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
    this.fs.copyTpl(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore"),
      {}
    );
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
      { gitAuth: this.answers.gitAuth}
    );
    this.fs.copyTpl(
      this.templatePath("maven/jvm.config"),
      this.destinationPath(".mvn/jvm.config"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/be/Application"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/java/" + this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be/meecrowave/" + "Application.java"),
      { packageDomain: this.answers.packageDomain, 
        packageModule: this.answers.name.split("-").join(".").toLowerCase() + ".be"
      }
    );
    this.fs.copyTpl(
      this.templatePath("java/be/Api"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/java/" + this.answers.packageDomain.split(".").join("/").toLowerCase() + "/" + this.answers.name.split("-").join("/").toLowerCase() + "/be/meecrowave/" + "Api.java"),
      { packageDomain: this.answers.packageDomain, 
        packageModule: this.answers.name.split("-").join(".").toLowerCase() + ".be"
      }
    );
    this.fs.copyTpl(
      this.templatePath("java/meta-inf/microprofile-config.properties"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/resources/META-INF/microprofile-config.properties"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/meecrowave/meecrowave.properties"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/resources/meecrowave.properties"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/log4j2/log4j2-dev.xml"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/resources/log4j2-dev.xml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/log4j2/log4j2.xml"),
      this.destinationPath(this.answers.name +  "-be" + "/src/main/resources/log4j2.xml"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("java/log4j2/empty-log.txt"),
      this.destinationPath(this.answers.name +  "-be" + "/logs/app.log"),
      {}
    );
  }

};
