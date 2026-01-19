using ReactCRUD.Core.Domain;


namespace ReactCRUD.Core.ServiceInterface
{
    public interface SchoolInterface
    {
        Task<School> SchoolDetail(Guid id);
    }
}
