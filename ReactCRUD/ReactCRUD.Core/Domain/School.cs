namespace ReactCRUD.Core.Domain
{
    public class School
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int StudentCount { get; set; }
    }
}
