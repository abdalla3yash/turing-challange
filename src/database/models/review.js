module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        'Review',
        {
            review_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue: 0,

            },
            review: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            rating: DataTypes.STRING(1000),
            created_on: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
              },
        },
        {
            timestamps: false,
            tableName: 'review',
        }
    );

    Review.associate = ({ Product, Customer }) => {
        Review.belongsTo(Product, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE',
        });

        Review.hasMany(Customer, {
            foreignKey: 'customer_id',
        });


    };

    return Review;
};

