<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240711065945 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_language DROP FOREIGN KEY FK_1F6B1B224584665A');
        $this->addSql('ALTER TABLE product_language DROP FOREIGN KEY FK_1F6B1B2282F1BAF4');
        $this->addSql('DROP TABLE product_language');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_language (product_id INT NOT NULL, language_id INT NOT NULL, INDEX IDX_1F6B1B2282F1BAF4 (language_id), INDEX IDX_1F6B1B224584665A (product_id), PRIMARY KEY(product_id, language_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE product_language ADD CONSTRAINT FK_1F6B1B224584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_language ADD CONSTRAINT FK_1F6B1B2282F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id) ON DELETE CASCADE');
    }
}
